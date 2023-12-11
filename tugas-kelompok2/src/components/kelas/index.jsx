import { useState, useEffect } from 'react';
import 'bootstrap/js/dist/modal';
import '../siswa/siswa.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function Kelas() {
  //define state
  const [kelas, setKelas] = useState([]);

  //update siswa
  const [updateData, setUpdateData] = useState({
    kelas:''
  });

  const handleRowClick = (row) => {
    console.log('Data yang akan diedit:', row);
    setUpdateData({
      id_kelas: row.id_kelas,
      kelas: row.kelas,
    });
  };

  const handleUpdate = async () => {
    try {
      console.log('Update Data:', updateData);
      // edit data berdasarkan id
      await axios.put(`http://localhost:5240/api/Kelas/${updateData.id_kelas}`, updateData);
      fetchData();
      console.log('Data berhasil diubah:', updateData);

      alert('Update data Berhasil');
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Update Data Gagal');
    }
  };

  //useEffect hook
  useEffect(() => {
    //panggil method "fetchData"
    fetchData();
  }, []);
  //function "fetchData"
  const fetchData = async () => {
    //fetching
    const response = await axios.get('http://localhost:5240/api/Kelas');
    //get response data
    const data = await response.data.data;
    //assign response data to state "data siswa"
    setKelas(data);
    console.log('Data Siswa dari Server:', data);
  };
  const columns = [
    {
      name: 'Id Kelas',
      selector: (row) => row.id_kelas,
      sortable: true,
    },
    {
      name: 'Kelas',
      selector: (row) => row.kelas,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
        <div className="action-buttons">
          <button
            onClick={() => handleRowClick(row)}
            className="edit-button"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            Edit
          </button>
          <button className="delete-button">Delete</button>
        </div>
      ),
      width: '200px',
    },
  ];
  return (
    <div className="card mt-4">
      <div className="container">
        <div className="title text-center">Data Siswa</div>
        <div className="content">
          <h2>Data Kelas</h2>
          <DataTable
            columns={columns}
            data={kelas}
            pagination
          />
        </div>

        {/* modal area tambah & edit */}
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalLabel"
                >
                  Edit Kelas
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Kelas</label>
                    <select
                      value={updateData.kelas}
                      onChange={(e) => setUpdateData({ ...updateData, kelas: e.target.value })}
                      className="form-select"
                    >
                      <option value="kelas1">10 TKJ</option>
                      <option value="kelas2">11 AKL</option>
                      <option value="kelas3">12 TKRO</option>
                    </select>
                  </div>
                  <button
                    onClick={handleUpdate}
                    className="btn btn-primary"
                  >
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Kelas;
