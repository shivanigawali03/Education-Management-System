import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

  const [reports, setReports] = useState([]);

  const [report, setReport] = useState({
    reportName: "",
    description: ""
  });

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadReports();
  }, []);


  const loadReports = () => {

    axios
      .get("http://localhost:8080/reports")
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

  };


  const handleChange = (e) => {

    setReport({
      ...report,
      [e.target.name]: e.target.value
    });

  };


  const saveReport = () => {

    if(editingId === null){

      axios
      .post("http://localhost:8080/reports", report)
      .then(() => {

        alert("Report Added Successfully");
        loadReports();
        clearForm();

      });

    }
    else{

      axios
      .put(`http://localhost:8080/reports/${editingId}`, report)
      .then(() => {

        alert("Report Updated Successfully");
        loadReports();
        clearForm();

      });

    }

  };


  const editReport = (data) => {

    setReport({
      reportName:data.reportName,
      description:data.description
    });

    setEditingId(data.id);

  };


  const deleteReport = (id) => {

    axios
    .delete(`http://localhost:8080/reports/${id}`)
    .then(() => {

      alert("Report Deleted Successfully");
      loadReports();

    });

  };


  const clearForm = () => {

    setReport({
      reportName:"",
      description:""
    });

    setEditingId(null);

  };


  return (

    <div>

      <h2>Reports Management</h2>


      <input
        type="text"
        name="reportName"
        placeholder="Enter Report Name"
        value={report.reportName}
        onChange={handleChange}
      />

      <br/><br/>


      <textarea
        name="description"
        placeholder="Enter Description"
        value={report.description}
        onChange={handleChange}
      />

      <br/><br/>


      <button onClick={saveReport}>
        {editingId === null ? "Save Report" : "Update Report"}
      </button>


      <br/><br/>


      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Report Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

        {
          reports.map((r)=>(

            <tr key={r.id}>

              <td>{r.id}</td>

              <td>{r.reportName}</td>

              <td>{r.description}</td>


              <td>

                <button onClick={() => editReport(r)}>
                  Edit
                </button>


                <button
                  onClick={() => deleteReport(r.id)}
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

export default Reports;