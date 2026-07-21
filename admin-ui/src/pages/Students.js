import { useEffect, useState } from "react";
import axios from "axios";

function Students() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: "",
    phone: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    axios
      .get("http://localhost:8080/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  const saveStudent = () => {
    if (editingId === null) {
      axios
        .post("http://localhost:8080/students", student)
        .then(() => {
          alert("Student Added Successfully");
          loadStudents();
          clearForm();
        });
    } else {
      axios
        .put(`http://localhost:8080/students/${editingId}`, student)
        .then(() => {
          alert("Student Updated Successfully");
          loadStudents();
          clearForm();
        });
    }
  };

  const deleteStudent = (id) => {
    axios
      .delete(`http://localhost:8080/students/${id}`)
      .then(() => {
        alert("Student Deleted Successfully");
        loadStudents();
      });
  };

  const editStudent = (data) => {
    setStudent({
      name: data.name,
      email: data.email,
      course: data.course,
      phone: data.phone,
    });

    setEditingId(data.id);
  };

  const clearForm = () => {
    setStudent({
      name: "",
      email: "",
      course: "",
      phone: "",
    });

    setEditingId(null);
  };

  return (
    <div>
      <h2>Student Management</h2>

      <input
        type="text"
        name="name"
        placeholder="Enter Name"
        value={student.name}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={student.email}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="course"
        placeholder="Enter Course"
        value={student.course}
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="phone"
        placeholder="Enter Phone"
        value={student.phone}
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={saveStudent}>
        {editingId === null ? "Save Student" : "Update Student"}
      </button>

      <br /><br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>{s.phone}</td>
              <td>
                <button onClick={() => editStudent(s)}>Edit</button>

                <button
                  onClick={() => deleteStudent(s.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Students;