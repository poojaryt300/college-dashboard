import Dashboard from "./componets/dashboard";
import StudentInterface from "./componets/Studentinterface";
import  "./componets/CollegePanel";
import "./App.css";

export default function App() {
  return (
    <div className="app">
      <h1>College Management System</h1>
      <Dashboard />
      <StudentInterface />
    </div>
  );
}
