import { getSalesData } from '@/services/reports/getSaleData';
import { formatReportData } from '@/services/reports/export/formatReportData';
import { exportToPDF } from '@/services/reports/export/exportPDF';
import { getAuthSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }

  const data = await getSalesData(session.user.id, 30);

  const formatted = formatReportData(data);
  const pdfBuffer = await exportToPDF(formatted);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=report.pdf`,
    },
  });
}
