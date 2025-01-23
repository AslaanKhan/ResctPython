export interface ChartData {
    name: string
    value: number
  }
  
  export interface TableData {
    id: string
    City: string
    "Product line": string
    total_amount: number
    total_quantity: number
    total_tax: number
  }
  
  export interface DashboardData {
    charts: {
      data: Record<string, number>
    }[]
    table: TableData[]
  }
  
  