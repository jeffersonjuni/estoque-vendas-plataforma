import { Parser } from "json2csv"
import { ReportRow } from "./formatReportData"

export function exportToCSV(data: ReportRow[]) {
  const fields = [
    { label: "Data", value: "date" },
    { label: "Total de Vendas", value: "totalSales" },
    { label: "Receita (R$)", value: "revenue" },
  ]

  const parser = new Parser({ fields })
  return parser.parse(data)
}