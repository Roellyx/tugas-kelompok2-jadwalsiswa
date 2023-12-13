import { useState, useEffect } from 'react';
import 'bootstrap/js/dist/modal';
import '../kelas/kelas.css';
import axios from 'axios';
import DataTable from 'react-data-table-component';

function Kelas() {
  //define state
  const [kelas, setKelas] = useState([]);

  //create kelas
  const [createData, setCreateData] = useState({kelas:''})

  //update kelas
  const [updateData, setUpdateData] = useState({kelas:''});


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

  const handleCreate = async () => {
    try {
      console.log('Create Data:', createData);
      // edit data berdasarkan id
      await axios.post(`http://localhost:5240/api/Kelas/`, createData);
      fetchData();
      console.log('Data berhasil ditambah:', createData);

      alert('Create data Berhasil');
      window.location.reload();

    } catch (error) {
      console.error('Error creating data:', error);
      alert('Create Data Gagal');
    }
  }


  const handleDelete = async (row) => {
    const deleteData = window.confirm(
      "Apakah anda yakin ingin menghapus Data ini?"
    );

    if (deleteData) {
      try {
        await axios
          .delete(`http://localhost:5240/api/Kelas/${row.id_kelas}`)
          .then((response) => console.log(response));
        fetchData();
        alert("Delete Data Berhasil");
        window.location.reload();

      } catch (error) {
        console.error("Error delete data", error);
        alert("Delete Data Gagal");
      }
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
      name: <h6>No</h6>,
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: <h6>Kelas</h6>,
      selector: (row) => row.kelas,
      sortable: true,
    },
    {
      name: <h6>Action</h6>,
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
          <input 
          type="text" 
          className="form-control" 
          value="" hidden/>
          <button onClick={() => handleDelete(row)} className="delete-button">Delete</button>
        </div>
      ),
      width: '200px',
    },
  ];


  return (
    <div className="card mt-4 border-0 shadow-lg">
      <div className="container">
        <div className="content">
          <h2 className='fw-bold my-3'>Data Kelas</h2>
          <button
            onClick={() => handleRowClick(row)}
            className="tambah-button btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#createModal">
            Tambah Data
          </button>

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
                  className="modal-title fs-4"
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
                    <label className="form-label fs-5">Nama Kelas</label>
                    <input
                      type="text"
                      className="form-control"
                      value={updateData.kelas}
                      onChange={(e) => setUpdateData({ ...updateData, kelas: e.target.value })}
                    />
                  </div>
                  <button onClick={handleUpdate} className="btn btn-primary">
                    Submit
                  </button>
              </div>
            </div>
          </div>
        </div>


        {/* Modal Create Data */}
        <div
          className="modal fade"
          id="createModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-4"
                  id="exampleModalLabel"
                >
                  Tambah Data Kelas
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
                    <label className="form-label fs-5">Nama Kelas</label>
                    <input
                      type="text"
                      className="form-control"
                      value={createData.kelas}
                      onChange={(e) => setCreateData({ ...createData, kelas: e.target.value })}
                    />
                  </div>
                  <button onClick={handleCreate} className="btn btn-primary">
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
