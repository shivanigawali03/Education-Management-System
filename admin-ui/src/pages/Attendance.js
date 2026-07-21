import { useEffect, useState } from "react";
import axios from "axios";

function Attendance() {

  const [attendance, setAttendance] = useState([]);

  const [data, setData] = useState({
    studentName: "",
    date: "",
    status: ""
  });


  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadAttendance();
  }, []);


  const loadAttendance = () => {

    axios
      .get("http://localhost:8080/attendance")
      .then((res)=>{
        setAttendance(res.data);
      })
      .catch((err)=>{
        console.log(err);
      });

  };


  const handleChange = (e)=>{

    setData({
      ...data,
      [e.target.name]: e.target.value
    });

  };


  const saveAttendance = ()=>{


    if(editingId === null){

      axios
      .post("http://localhost:8080/attendance", data)
      .then(()=>{
        alert("Attendance Added");
        loadAttendance();
        clearForm();
      });


    }else{


      axios
      .put(`http://localhost:8080/attendance/${editingId}`, data)
      .then(()=>{
        alert("Attendance Updated");
        loadAttendance();
        clearForm();
      });


    }


  };


  const editAttendance = (item)=>{

    setData({
      studentName:item.studentName,
      date:item.date,
      status:item.status
    });

    setEditingId(item.id);

  };


  const deleteAttendance = (id)=>{

    axios
    .delete(`http://localhost:8080/attendance/${id}`)
    .then(()=>{
      alert("Attendance Deleted");
      loadAttendance();
    });

  };


  const clearForm = ()=>{

    setData({
      studentName:"",
      date:"",
      status:""
    });

    setEditingId(null);

  };


  return (

    <div>

      <h2>Attendance Management</h2>


      <input
      type="text"
      name="studentName"
      placeholder="Enter Student Name"
      value={data.studentName}
      onChange={handleChange}
      />

      <br/><br/>


      <input
      type="date"
      name="date"
      value={data.date}
      onChange={handleChange}
      />

      <br/><br/>


      <select
      name="status"
      value={data.status}
      onChange={handleChange}
      >

        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>

      </select>


      <br/><br/>


      <button onClick={saveAttendance}>
        {editingId===null ? "Save Attendance":"Update Attendance"}
      </button>


      <br/><br/>


      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

        {
          attendance.map((a)=>(

            <tr key={a.id}>

              <td>{a.id}</td>

              <td>{a.studentName}</td>

              <td>{a.date}</td>

              <td>{a.status}</td>

              <td>

                <button onClick={()=>editAttendance(a)}>
                  Edit
                </button>


                <button
                onClick={()=>deleteAttendance(a.id)}
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

export default Attendance;