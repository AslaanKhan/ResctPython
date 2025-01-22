import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useEffect, useState } from "react";
import { dashboardService } from "@/services/dashboardService";
import { DataTable } from "./dataTable/page";
import { columns } from "./dataTable/columns";

const lineChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

// const barChartData = [
//   { name: 'A', value: 400 },
//   { name: 'B', value: 300 },
//   { name: 'C', value: 600 },
//   { name: 'D', value: 800 },
//   { name: 'E', value: 500 },
// ];

// const pieChartData = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ];

// const tableData = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Inactive' },
//   { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Active' },
//   { id: 4, name: 'Alice Brown', email: 'alice@example.com', status: 'Pending' },
// ];

export function Dashboard() {
  // const [lineChartData, setLineChartData] = useState([])
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [tableData, settableData] = useState([]);
  const fetchData = async () => {
    const data = await dashboardService.getChartData();
    console.log(data.table);
    settableData(data.table);
    //@ts-ignore
    setBarChartData(
      Object.keys(data?.charts[0].data).map((key) => ({
        name: key,
        value: data?.charts[0].data[key],
      }))
    );
    setPieChartData(
      Object.keys(data?.charts[1].data).map((key) => ({
        name: key,
        value: data?.charts[1].data[key],
      }))
    );
    // setLineChartData(Object.keys(data?.charts[2].data).map((key) => ({
    //     name: key,
    //     value: data?.charts[2].data[key]
    // })))
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Line Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bar Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pie Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie dataKey="value" data={pieChartData} fill="#8884d8" label />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>User Table</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={tableData} />
          {/* <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead>Product line</TableHead>
                <TableHead>total_amount</TableHead>
                <TableHead>total_quantity</TableHead>
                <TableHead>total_tax</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.map((user) => (
                <TableRow key={user?.id}>
                  <TableCell>{user?.City}</TableCell>
                  <TableCell>{user?.['Product line']}</TableCell>
                  <TableCell>{user?.total_amount}</TableCell>
                  <TableCell>{user?.total_quantity}</TableCell>
                  <TableCell>{user?.total_tax}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </CardContent>
      </Card>
    </div>
  );
}
