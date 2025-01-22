import api from "./api"

export interface ChartData {
  name: string
  value: number
}

export interface UserData {
  id: number
  name: string
  email: string
  status: string
}

export const dashboardService = {
  async getChartData(): Promise<ChartData[]> {
    const response = await api.get<ChartData[]>("/charts")
    return response.data
  },

//   async getBarChartData(): Promise<ChartData[]> {
//     const response = await api.get<ChartData[]>("/dashboard/bar-chart")
//     return response.data
//   },

//   async getPieChartData(): Promise<ChartData[]> {
//     const response = await api.get<ChartData[]>("/dashboard/pie-chart")
//     return response.data
//   },

//   async getUserTableData(): Promise<UserData[]> {
//     const response = await api.get<UserData[]>("/dashboard/users")
//     return response.data
//   },
}

