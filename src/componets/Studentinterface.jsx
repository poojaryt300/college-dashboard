import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function StudentInterface() {
  const student = {
    name: "Tharun Poojary",
    regNo: "CSE001",
    attendance: 85,
    percentage: 78,
  };

  const data = [
    { name: "Attendance", value: student.attendance },
    { name: "Absent", value: 100 - student.attendance },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="student-interface">
      <h2>{student.name} ({student.regNo})</h2>
      <p>Percentage: {student.percentage}%</p>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}
