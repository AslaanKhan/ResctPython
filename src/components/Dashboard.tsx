import { dashboardService } from "@/services/dashboardService"
import { type ChartData, type DashboardData } from "@/types/dashboard"
import { useEffect, useState } from "react"
import { DashboardChart } from "./DashboardChart"
import { DashboardTable } from "./DashboardTable"

const lineChartData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
  { name: "Jun", value: 700 },
];

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data:any = await dashboardService.getChartData()
        setDashboardData(data)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      }
    }

    fetchData()
  }, [])

  const formatChartData = (index: number): ChartData[] => {
    if (!dashboardData) return []
    return Object.entries(dashboardData.charts[index].data).map(([name, value]) => ({
      name,
      value,
    }))
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardChart title="Line Chart" type="line" data={lineChartData} />
        <DashboardChart title="Bar Chart" type="bar" data={formatChartData(0)} />
        <DashboardChart title="Pie Chart" type="pie" data={formatChartData(1)} />
      </div>
      <DashboardTable data={dashboardData?.table || []} />
    </div>
  )
}

