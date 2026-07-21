import { useEffect, useState } from "react";
import axios from "axios";

function Task() {

  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState({
    taskName: "",
    assignedTo: "",
    dueDate: "",
    status: ""
  });

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadTasks();
  }, []);


  const loadTasks = () => {

    axios
      .get("http://localhost:8080/tasks")
      .then((res)=>{
        setTasks(res.data);
      })
      .catch((err)=>{
        console.log(err);
      });

  };


  const handleChange = (e)=>{

    setTask({
      ...task,
      [e.target.name]: e.target.value
    });

  };


  const saveTask = ()=>{

    if(editingId === null){

      axios
      .post("http://localhost:8080/tasks",task)
      .then(()=>{

        alert("Task Added Successfully");
        loadTasks();
        clearForm();

      });

    }
    else{

      axios
      .put(`http://localhost:8080/tasks/${editingId}`,task)
      .then(()=>{

        alert("Task Updated Successfully");
        loadTasks();
        clearForm();

      });

    }

  };


  const editTask = (data)=>{

    setTask({
      taskName:data.taskName,
      assignedTo:data.assignedTo,
      dueDate:data.dueDate,
      status:data.status
    });

    setEditingId(data.id);

  };


  const deleteTask = (id)=>{

    axios
    .delete(`http://localhost:8080/tasks/${id}`)
    .then(()=>{

      alert("Task Deleted Successfully");
      loadTasks();

    });

  };


  const clearForm = ()=>{

    setTask({
      taskName:"",
      assignedTo:"",
      dueDate:"",
      status:""
    });

    setEditingId(null);

  };


  return (

    <div>

      <h2>Task Assignment</h2>


      <input
      type="text"
      name="taskName"
      placeholder="Enter Task Name"
      value={task.taskName}
      onChange={handleChange}
      />

      <br/><br/>


      <input
      type="text"
      name="assignedTo"
      placeholder="Assigned To"
      value={task.assignedTo}
      onChange={handleChange}
      />

      <br/><br/>


      <input
      type="date"
      name="dueDate"
      value={task.dueDate}
      onChange={handleChange}
      />

      <br/><br/>


      <select
      name="status"
      value={task.status}
      onChange={handleChange}
      >

        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>

      </select>


      <br/><br/>


      <button onClick={saveTask}>
        {editingId===null ? "Save Task":"Update Task"}
      </button>


      <br/><br/>


      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Task Name</th>
            <th>Assigned To</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

        {
          tasks.map((t)=>(

            <tr key={t.id}>

              <td>{t.id}</td>
              <td>{t.taskName}</td>
              <td>{t.assignedTo}</td>
              <td>{t.dueDate}</td>
              <td>{t.status}</td>

              <td>

                <button onClick={()=>editTask(t)}>
                  Edit
                </button>

                <button
                onClick={()=>deleteTask(t.id)}
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

export default Task;