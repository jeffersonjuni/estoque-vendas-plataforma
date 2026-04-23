export interface ReportRow {
  date: string
  totalSales: number
  revenue: number
}

export function formatReportData(data: any[]): ReportRow[] {
  return data.map((item) => ({
    date: item.date,
    totalSales: Number(item.totalSales ?? item.sales ?? 0),
    revenue: Number(item.revenue ?? 0),
  }))
}