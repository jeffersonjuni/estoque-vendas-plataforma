import { getSalesData } from "@/services/reports/getSaleData"
import { formatReportData } from "@/services/reports/export/formatReportData"
import { exportToCSV } from "@/services/reports/export/exportCSV"
import { getAuthSession } from "@/lib/auth"

export async function GET() {
  const session = await getAuthSession()

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 })
  }

  const data = await getSalesData(session.user.id, 30)

  const formatted = formatReportData(data)
  const csv = exportToCSV(formatted)

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=report.csv`,
    },
  })
}