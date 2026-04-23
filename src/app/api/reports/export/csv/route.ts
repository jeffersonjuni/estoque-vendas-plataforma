import { getSalesData } from "@/services/reports/getSaleData"
import { formatReportData } from "@/services/reports/export/formatReportData"
import { exportToCSV } from "@/services/reports/export/exportCSV"
import { getAuthSession } from "@/lib/auth"

export async function GET(req: Request) {
  const session = await getAuthSession()

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  
  const { searchParams } = new URL(req.url)
  const days = Number(searchParams.get("days") || 30)

  
  const data = await getSalesData(session.user.id, days)

  const formatted = formatReportData(data)
  const csv = exportToCSV(formatted)

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=report-${days}dias.csv`,
    },
  })
}