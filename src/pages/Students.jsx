import { useEffect, useState } from "react";
import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../Services/studentService";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [department, setDepartment] = useState("");

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadStudents();
  }, []);

  // Load Students
  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Add or Update Student
  const saveStudent = async () => {
    if (!name || !rollNumber || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        await updateStudent(editingId, {
          name,
          rollNumber,
          department,
        });

        alert("Student Updated Successfully");
      } else {
        await addStudent({
          name,
          rollNumber,
          department,
        });

        alert("Student Added Successfully");
      }

      // Clear form
      setName("");
      setRollNumber("");
      setDepartment("");
      setEditingId(null);

      // Reload Students
      await loadStudents();

    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  // Edit Student
  const editStudent = (student) => {
    setEditingId(student._id);

    setName(student.name);
    setRollNumber(student.rollNumber);
    setDepartment(student.department);
  };

  // Delete Student
  const deleteStudentData = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      await loadStudents();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="students-page">

      <h1>Students Management</h1>

      <div className="student-form">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>

          <option value="CSE">CSE</option>
          <option value="ECE">ECE</option>
          <option value="EEE">EEE</option>
          <option value="MECH">MECH</option>
          <option value="CIVIL">CIVIL</option>
          <option value="IT">IT</option>
          <option value="AIML">AIML</option>
          <option value="CSM">CSM</option>
          <option value="CSD">CSD</option>
          <option value="DS">DS</option>
          <option value="MBA">MBA</option>
          <option value="MCA">MCA</option>
        </select>

        <button onClick={saveStudent}>
          {editingId ? "Update Student" : "Add Student"}
        </button>

      </div>

      <table>

        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {students.length === 0 ? (
            <tr>
              <td colSpan="4">No Students Found</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student._id}>

                <td>{student.name}</td>

                <td>{student.rollNumber}</td>

                <td>{student.department}</td>

                <td>

                  <div className="action-buttons">

                    <button
                      className="edit-btn"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteStudentData(student._id)}
                    >
                      Delete
                    </button>

                  </div>

                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default Students;
