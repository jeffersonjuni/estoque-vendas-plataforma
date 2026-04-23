import PDFDocument from "pdfkit"
import path from "path"
import { ReportRow } from "./formatReportData"

export async function exportToPDF(data: ReportRow[]) {
  
  const fontPath = path.join(
    process.cwd(),
    "src/assets/fonts/Roboto-Regular.ttf"
  )

  const doc = new PDFDocument({
    margin: 40,
    font: fontPath, // 🔥 AQUI está a correção
  })

  const buffers: Buffer[] = []
  doc.on("data", buffers.push.bind(buffers))

  // 🔹 Título
  doc.fontSize(18).text("Relatório de Vendas", { align: "center" })

  doc.moveDown()

  // 🔹 Cabeçalho
  doc.fontSize(12).text("Data | Vendas | Receita (R$)")
  doc.moveDown(0.5)

  data.forEach((item) => {
    doc.text(
      `${item.date} | ${item.totalSales} | ${item.revenue.toFixed(2)}`
    )
  })

  const totalRevenue = data.reduce((acc, i) => acc + i.revenue, 0)
  const totalSales = data.reduce((acc, i) => acc + i.totalSales, 0)

  doc.moveDown()
  doc.text(`Total de vendas: ${totalSales}`)
  doc.text(`Receita total: R$ ${totalRevenue.toFixed(2)}`)

  doc.end()

  return new Promise<Buffer>((resolve) => {
    doc.on("end", () => {
      resolve(Buffer.concat(buffers))
    })
  })
}