import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ChartData } from "@/types/dashboard"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
} from "recharts"

interface DashboardChartProps {
  title: string
  type: "line" | "bar" | "pie"
  data: ChartData[]
}

export function DashboardChart({ title, type, data }: DashboardChartProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
          </LineChart>
        )
      case "bar":
        return (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        )
      case "pie":
        return (
          <PieChart>
            <Pie dataKey="value" data={data} fill="#8884d8" label />
            <Tooltip />
          </PieChart>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          {renderChart()}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

