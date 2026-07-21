import { useEffect, useState } from "react";
import axios from "axios";

function Users() {

  const [users, setUsers] = useState([]);

  const [user, setUser] = useState({
    name: "",
    role: ""
  });

  const [editingId, setEditingId] = useState(null);


  useEffect(() => {
    loadUsers();
  }, []);


  // Get all users
  const loadUsers = () => {
    axios
      .get("http://localhost:8080/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // Input change
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };


  // Save / Update User
  const saveUser = () => {

    if(editingId === null){

      axios
        .post("http://localhost:8080/users", user)
        .then(() => {
          alert("User Added Successfully");
          loadUsers();
          clearForm();
        });

    }else{

      axios
        .put(`http://localhost:8080/users/${editingId}`, user)
        .then(() => {
          alert("User Updated Successfully");
          loadUsers();
          clearForm();
        });

    }

  };


  // Edit User
  const editUser = (data) => {

    setUser({
      name:data.name,
      role:data.role
    });

    setEditingId(data.id);

  };


  // Delete User
  const deleteUser = (id) => {

    axios
      .delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        alert("User Deleted Successfully");
        loadUsers();
      });

  };


  // Clear form
  const clearForm = () => {

    setUser({
      name:"",
      role:""
    });

    setEditingId(null);

  };


  return (
    <div>

      <h2>User Management</h2>


      <input
        type="text"
        name="name"
        placeholder="Enter User Name"
        value={user.name}
        onChange={handleChange}
      />

      <br/><br/>


      <input
        type="text"
        name="role"
        placeholder="Enter Role"
        value={user.role}
        onChange={handleChange}
      />

      <br/><br/>


      <button onClick={saveUser}>
        {editingId === null ? "Save User" : "Update User"}
      </button>


      <br/><br/>


      <table border="1" cellPadding="10">

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Action</th>
          </tr>

        </thead>


        <tbody>

          {
            users.map((u)=>(

              <tr key={u.id}>

                <td>{u.id}</td>

                <td>{u.name}</td>

                <td>{u.role}</td>


                <td>

                  <button onClick={() => editUser(u)}>
                    Edit
                  </button>


                  <button
                    onClick={() => deleteUser(u.id)}
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

export default Users;