import { useEffect, useState } from "react";
import axios from "axios";

function Batch() {

  const [batches, setBatches] = useState([]);

  const [batch, setBatch] = useState({
    batchName: "",
    trainerName: "",
    course: ""
  });

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadBatches();
  }, []);


  const loadBatches = () => {

    axios
      .get("http://localhost:8080/batches")
      .then((res) => {
        setBatches(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  const handleChange = (e) => {

    setBatch({
      ...batch,
      [e.target.name]: e.target.value
    });

  };


  const saveBatch = () => {

    if(editingId === null) {

      axios
      .post("http://localhost:8080/batches", batch)
      .then(() => {

        alert("Batch Added Successfully");
        loadBatches();
        clearForm();

      });

    } 
    else {

      axios
      .put(`http://localhost:8080/batches/${editingId}`, batch)
      .then(() => {

        alert("Batch Updated Successfully");
        loadBatches();
        clearForm();

      });

    }

  };


  const editBatch = (data) => {

    setBatch({
      batchName: data.batchName,
      trainerName: data.trainerName,
      course: data.course
    });

    setEditingId(data.id);

  };


  const deleteBatch = (id) => {

    axios
    .delete(`http://localhost:8080/batches/${id}`)
    .then(() => {

      alert("Batch Deleted Successfully");
      loadBatches();

    });

  };


  const clearForm = () => {

    setBatch({
      batchName:"",
      trainerName:"",
      course:""
    });

    setEditingId(null);

  };


  return (

    <div>

      <h2>Batch Allocation</h2>


      <input
        type="text"
        name="batchName"
        placeholder="Enter Batch Name"
        value={batch.batchName}
        onChange={handleChange}
      />

      <br/><br/>


      <input
        type="text"
        name="trainerName"
        placeholder="Enter Trainer Name"
        value={batch.trainerName}
        onChange={handleChange}
      />

      <br/><br/>


      <input
        type="text"
        name="course"
        placeholder="Enter Course"
        value={batch.course}
        onChange={handleChange}
      />

      <br/><br/>


      <button onClick={saveBatch}>
        {editingId === null ? "Save Batch" : "Update Batch"}
      </button>


      <br/><br/>


      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Batch Name</th>
            <th>Trainer Name</th>
            <th>Course</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

        {
          batches.map((b)=>(

            <tr key={b.id}>

              <td>{b.id}</td>

              <td>{b.batchName}</td>

              <td>{b.trainerName}</td>

              <td>{b.course}</td>


              <td>

                <button onClick={() => editBatch(b)}>
                  Edit
                </button>


                <button
                  onClick={() => deleteBatch(b.id)}
                  style={{marginLeft:"10px"}}
                >
                  Delete
                </button>

              </td>

            </tr>

          ))
        }

        </tbody>


      </table>


    </div>

  );

}

export default Batch;