import { useEffect, useState } from "react";
import { getAttendance } from "../services/attendanceService";
import { getStudents } from "../services/studentService";
import "./Reports.css";

function Reports() {
  const [students, setStudents] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [branchData, setBranchData] = useState([]);

  useEffect(() => {
    loadStudents();
    loadAttendance();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await getStudents();
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadAttendance = async () => {
    try {
      const res = await getAttendance();

      const report = {};

      res.data.forEach((item) => {
        const student = item.studentId;

        if (!student) return;

        if (!report[student._id]) {
          report[student._id] = {
            id: student._id,
            name: student.name,
            rollNumber: student.rollNumber,
            department: student.department,
            present: 0,
            absent: 0,
          };
        }

        if (item.status === "Present") {
          report[student._id].present++;
        } else {
          report[student._id].absent++;
        }
      });

      const reportArray = Object.values(report);

      setReportData(reportArray);

      // Branch Wise Report
      const branches = {};

      reportArray.forEach((student) => {
        if (!branches[student.department]) {
          branches[student.department] = {
            department: student.department,
            present: 0,
            absent: 0,
          };
        }

        branches[student.department].present += student.present;
        branches[student.department].absent += student.absent;
      });

      setBranchData(Object.values(branches));
    } catch (err) {
      console.log(err);
    }
  };

  const totalPresent = reportData.reduce(
    (sum, student) => sum + student.present,
    0
  );

  const totalAbsent = reportData.reduce(
    (sum, student) => sum + student.absent,
    0
  );

  const percentage =
    totalPresent + totalAbsent === 0
      ? 0
      : (
          (totalPresent / (totalPresent + totalAbsent)) *
          100
        ).toFixed(1);

  return (
    <div className="reports-page">

      <h1>Attendance Reports</h1>

      {/* Cards */}

      <div className="report-cards">

        <div className="report-card total-student-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="report-card present-card">
          <h2>{totalPresent}</h2>
          <p>Total Present</p>
        </div>

        <div className="report-card absent-card">
          <h2>{totalAbsent}</h2>
          <p>Total Absent</p>
        </div>

        <div className="report-card total-card">
          <h2>{percentage}%</h2>
          <p>Attendance Percentage</p>
        </div>

      </div>

      {/* Student Report */}

      <h2>Student Wise Attendance Report</h2>

      <div className="report-table">

        <table>

          <thead>

            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Roll No</th>
              <th>Department</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Attendance %</th>
            </tr>

          </thead>

          <tbody>

            {reportData.map((student, index) => {

              const total =
                student.present + student.absent;

              const percent =
                total === 0
                  ? 0
                  : (
                      (student.present / total) *
                      100
                    ).toFixed(1);

              return (

                <tr key={student.id}>

                  <td>{index + 1}</td>

                  <td>{student.name}</td>

                  <td>{student.rollNumber}</td>

                  <td>{student.department}</td>

                  <td>{student.present}</td>

                  <td>{student.absent}</td>

                  <td>{percent}%</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

      {/* Branch Report */}

      <h2>Branch Wise Attendance Report</h2>

      <div className="branch-table">

        <table>

          <thead>

            <tr>
              <th>Department</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Attendance %</th>
            </tr>

          </thead>

          <tbody>

            {branchData.map((branch) => {

              const total =
                branch.present + branch.absent;

              const percent =
                total === 0
                  ? 0
                  : (
                      (branch.present / total) *
                      100
                    ).toFixed(1);

              return (

                <tr key={branch.department}>

                  <td>{branch.department}</td>

                  <td>{branch.present}</td>

                  <td>{branch.absent}</td>

                  <td>{percent}%</td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Reports;