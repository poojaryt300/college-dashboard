import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("HOD");
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("General");
  const [role, setRole] = useState("HOD");
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Dummy data
  const [hods, setHods] = useState([
    { name: "Dr. Suresha D", branch: "CSE" },
    { name: "Prof. Daya naik", branch: "AIML" },
    { name: "Shailesh Shetty", branch: "CSBS" },
  ]);

  const [staff, setStaff] = useState([
    { name: "Prof. Keerthana", branch: "CSE", subject: "Data Structure" },
    { name: "Prof. Shreya Shetty", branch: "CSE", subject: "OOPS with JAVA" },
    { name: "Prof. Salini Abhram", branch: "CSE", subject: "Data Visualization" },
    { name: "Prof. Naseebha", branch: "CSE", subject: "Full Stack" },
    { name: "Dr. Savitha", branch: "MATHEMATICS", subject: "Discrete Mathematics" },
  ]);

  const [students, setStudents] = useState([
    { name: "Tharun", usn: "CSE001", branch: "CSE", attendance: 85 },
    { name: "Harsh", usn: "CSE002", branch: "CSE", attendance: 90 },
    { name: "Srishan", usn: "CSE003", branch: "CSE", attendance: 80 },
    { name: "Showri Bhat", usn: "CSE004", branch: "CSE", attendance: 88 },
  ]);

  const branchOptions = ["CSE", "ECE", "ME", "CIVIL", "EEE"];

  // Average Attendance
  const totalAttendance = students.reduce((sum, s) => sum + s.attendance, 0);
  const avgAttendance = (totalAttendance / students.length).toFixed(2);

  const renderTable = () => {
    switch (activeTab) {
      case "HOD":
        return (
          <div>
            <div className="student-header">
              <h3>HOD List</h3>
              <button
                className="add-student-btn"
                onClick={() => {
                  setShowForm(true);
                  setFormType("HOD");
                }}
              >
                Add HOD
              </button>
            </div>
            <table>
              <thead>
                <tr><th>Name</th><th>Branch</th></tr>
              </thead>
              <tbody>
                {hods.map((h, i) => (
                  <tr key={i}><td>{h.name}</td><td>{h.branch}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Staff":
        return (
          <div>
            <div className="student-header">
              <h3>Staff List</h3>
              <button
                className="add-student-btn"
                onClick={() => {
                  setShowForm(true);
                  setFormType("Staff");
                }}
              >
                Add Staff
              </button>
            </div>
            <table>
              <thead>
                <tr><th>Name</th><th>Branch</th><th>Subject</th></tr>
              </thead>
              <tbody>
                {staff.map((s, i) => (
                  <tr key={i}><td>{s.name}</td><td>{s.branch}</td><td>{s.subject}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "Students":
        return (
          <div className="student-section">
            <div className="student-header">
              <h3>Student List</h3>
              <button
                className="add-student-btn"
                onClick={() => {
                  setShowForm(true);
                  setFormType("Student");
                }}
              >
                Add Student
              </button>
            </div>
            <table>
              <thead>
                <tr><th>Name</th><th>USN</th><th>Branch</th><th>Attendance</th></tr>
              </thead>
              <tbody>
                {students.map((st, i) => (
                  <tr
                    key={i}
                    className="student-row"
                    onClick={() => setSelectedStudent(st)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>{st.name}</td>
                    <td>{st.usn}</td>
                    <td>{st.branch}</td>
                    <td>{st.attendance}%</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Show Pie Chart when student selected */}
            {selectedStudent && (
              <div className="student-details">
                <h3>
                  {selectedStudent.name} ({selectedStudent.usn})
                </h3>
                <p>Branch: {selectedStudent.branch}</p>
                <ResponsiveContainer width="50%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Present", value: selectedStudent.attendance },
                        { name: "Absent", value: 100 - selectedStudent.attendance },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      <Cell key="present" fill="#4CAF50" />
                      <Cell key="absent" fill="#F44336" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        );

      case "Attendance":
        return (
          <div>
            <h3>Attendance Overview</h3>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <p>Total Students: {students.length}</p>
            <p>Average Attendance: {avgAttendance}%</p>
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    { name: "Average Present", value: avgAttendance },
                    { name: "Average Absent", value: 100 - avgAttendance },
                  ]}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                >
                  <Cell key="present" fill="#2196F3" />
                  <Cell key="absent" fill="#FF9800" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newEntry = Object.fromEntries(formData.entries());

    if (formType === "Student" || role === "Student") {
      setStudents([
        ...students,
        {
          name: newEntry.name,
          usn: newEntry.usn,
          branch: newEntry.branch,
          attendance: parseInt(newEntry.attendance, 10),
        },
      ]);
    } else if (formType === "HOD" || role === "HOD") {
      setHods([...hods, { name: newEntry.name, branch: newEntry.branch }]);
    } else if (formType === "Staff" || role === "Staff") {
      setStaff([
        ...staff,
        { name: newEntry.name, branch: newEntry.branch, subject: newEntry.subject },
      ]);
    }

    setShowForm(false);
    e.target.reset();
  };

  return (
    <div className="dashboard">
      <div className="tabs">
        {["HOD", "Staff", "Students", "Attendance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "active" : ""}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="table-section">{renderTable()}</div>

      {/* Floating Plus Button */}
      <button
        className="plus-btn"
        onClick={() => {
          setShowForm(true);
          setFormType("General");
        }}
      >
        +
      </button>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>
              {formType === "Student"
                ? "Add Student"
                : formType === "HOD"
                ? "Add HOD"
                : formType === "Staff"
                ? "Add Staff"
                : "New Registration"}
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Name */}
              <label>
                Name:
                <input type="text" name="name" required />
              </label>

              {/* General Role Selector */}
              {formType === "General" && (
                <label>
                  Role:
                  <select
                    name="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="HOD">HOD</option>
                    <option value="Staff">Staff</option>
                    <option value="Student">Student</option>
                  </select>
                </label>
              )}

              {/* Student Fields */}
              {(formType === "Student" || role === "Student") && (
                <>
                  <label>
                    USN:
                    <input type="text" name="usn" required />
                  </label>
                  <label>
                    Branch:
                    <select name="branch" required>
                      {branchOptions.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Attendance (%):
                    <input type="number" name="attendance" min="0" max="100" required />
                  </label>
                </>
              )}

              {/* HOD Fields */}
              {(formType === "HOD" || role === "HOD") && (
                <label>
                  Branch:
                  <select name="branch" required>
                    {branchOptions.map((b, i) => (
                      <option key={i} value={b}>{b}</option>
                    ))}
                  </select>
                </label>
              )}

              {/* Staff Fields */}
              {(formType === "Staff" || role === "Staff") && (
                <>
                  <label>
                    Branch:
                    <select name="branch" required>
                      {branchOptions.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Subject:
                    <input type="text" name="subject" required />
                  </label>
                </>
              )}

              {/* Form Actions */}
              <div className="modal-actions">
                <button type="submit">Register</button>
                <button
                  type="button"
                  className="cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
