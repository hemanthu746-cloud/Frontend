import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";
import { getAttendance, addAttendance } from "../services/attendanceService";
import "./Attendance.css";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (date) {
      loadAttendance();
    }
  }, [date]);

  const loadStudents = async () => {
    const res = await getStudents();
    setStudents(res.data);
  };

  const loadAttendance = async () => {
    const res = await getAttendance();

    const map = {};

    res.data.forEach((item) => {
      if (item.date === date) {
        map[item.studentId._id] = item.status;
      }
    });

    setAttendance(map);
  };

  const markAttendance = async (studentId, status) => {
    if (!date) {
      alert("Please select date");
      return;
    }

    if (attendance[studentId]) return;

    try {
      await addAttendance({
        studentId,
        date,
        status,
      });

      setAttendance({
        ...attendance,
        [studentId]: status,
      });
    } catch (err) {
      alert("Attendance already marked");
    }
  };

  return (
    <div className="attendance-page">
      <h1>Attendance</h1>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Department</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.rollNumber}</td>
              <td>{student.department}</td>

              <td>
                {attendance[student._id] ? (
                  attendance[student._id] === "Present" ? (
                    <button className="present-btn selected">
                      ✔ Present
                    </button>
                  ) : (
                    <button className="absent-btn selected">
                      ✖ Absent
                    </button>
                  )
                ) : (
                  <>
                    <button
                      className="present-btn"
                      onClick={() =>
                        markAttendance(student._id, "Present")
                      }
                    >
                      Present
                    </button>

                    <button
                      className="absent-btn"
                      onClick={() =>
                        markAttendance(student._id, "Absent")
                      }
                    >
                      Absent
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Attendance;