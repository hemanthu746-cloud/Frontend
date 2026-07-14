import { useEffect, useState } from "react";
import { getStudents } from "../services/studentService";
import { getAttendance } from "../services/attendanceService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import "./Dashboard.css";

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AA00FF",
    "#FF4560",
    "#775DD0",
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const studentRes = await getStudents();
      const attendanceRes = await getAttendance();

      setStudents(studentRes.data);
      setAttendance(attendanceRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Today's date
  const today = new Date().toISOString().split("T")[0];

  // Today's attendance only
  const todayAttendance = attendance.filter(
    (item) => item.date === today
  );

  const presentToday = todayAttendance.filter(
    (item) => item.status === "Present"
  ).length;

  const absentToday = todayAttendance.filter(
    (item) => item.status === "Absent"
  ).length;

  // Department chart
  const departmentCount = {};

  students.forEach((student) => {
    departmentCount[student.department] =
      (departmentCount[student.department] || 0) + 1;
  });

  const chartData = Object.keys(departmentCount).map((dept) => ({
    name: dept,
    value: departmentCount[dept],
  }));

  return (
    <div className="dashboard">

      <h1>Dashboard</h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h2>{students.length}</h2>
          <p>Total Students</p>
        </div>

        <div className="dashboard-card">
          <h2>{presentToday}</h2>
          <p>Present Today</p>
        </div>

        <div className="dashboard-card">
          <h2>{absentToday}</h2>
          <p>Absent Today</p>
        </div>

        <div className="dashboard-card">
          <h2>{chartData.length}</h2>
          <p>Departments</p>
        </div>

      </div>

      <div className="chart-container">

        <h2>Students by Department</h2>

        <PieChart width={500} height={350}>

          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={120}
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend />

        </PieChart>

      </div>

    </div>
  );
}

export default Dashboard;