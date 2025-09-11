import { useState } from "react";
import "./CollegePanel.css";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CollegePanel({ students = [] }) {
  const [activeTab, setActiveTab] = useState("HOD");

  // Dummy data
  const hods = [
    { name: "Dr. Rao", branch: "CSE" },
    { name: "Dr. Meena", branch: "ECE" },
  ];

  const staff = {
    CSE: ["Prof. Arjun", "Prof. Kavya"],
    ECE: ["Prof. Sahana", "Prof. Mohan"],
  };

  const COLORS = ["#16a34a", "#dc2626"]; // green, red

  return (
    <div className="college-panel">
      {/* Top Navigation Tabs */}
      <nav className="tab-bar">
        {["HOD", "Staff", "Student", "Attendance Marking"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content Section */}
      <div className="tab-content">
        {/* HOD Section */}
        {activeTab === "HOD" && (
          <div>
            <h3>Heads of Departments</h3>
            <ul className="list-group">
              {hods.map((hod, idx) => (
                <li key={idx} className="list-group-item">
                  <strong>{hod.name}</strong> - {hod.branch}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Staff Section */}
        {activeTab === "Staff" && (
          <div>
            <h3>Staff Members (Branch-wise)</h3>
            {Object.keys(staff).map((branch, idx) => (
              <div key={idx} className="mb-3">
                <h5>{branch}</h5>
                <ul>
                  {staff[branch].map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Student Section */}
        {activeTab === "Student" && (
          <div>
            <h3>Student Attendance Overview</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
              {students.map((student, idx) => {
                const total = student.attendanceHistory.length;
                const present = student.attendanceHistory.filter(
                  (r) => r.status === "Present"
                ).length;
                const absent = student.attendanceHistory.filter(
                  (r) => r.status === "Absent"
                ).length;
                const percent = total ? ((present / total) * 100).toFixed(1) : 0;
                return (
                  <div
                    key={idx}
                    className="card"
                    style={{
                      width: 300,
                      padding: 16,
                      marginBottom: 16,
                      textAlign: "center",
                    }}
                  >
                    <h5>
                      {student.name} ({student.roll})
                    </h5>
                    <p>
                      Attendance: <strong>{percent}%</strong>
                    </p>
                    <ResponsiveContainer width="100%" height={180}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Present", value: present },
                            { name: "Absent", value: absent },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          dataKey="value"
                          label
                        >
                          <Cell fill={COLORS[0]} />
                          <Cell fill={COLORS[1]} />
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Attendance Section */}
        {activeTab === "Attendance Marking" && (
          <div>
            <h3>Attendance Marking</h3>
            <p>Here you can add attendance marking feature later.</p>
          </div>
        )}
      </div>
    </div>
  );
}