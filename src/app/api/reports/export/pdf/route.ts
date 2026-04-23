import { getSalesData } from '@/services/reports/getSaleData';
import { formatReportData } from '@/services/reports/export/formatReportData';
import { exportToPDF } from '@/services/reports/export/exportPDF';
import { getAuthSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return new Response('Unauthorized', { status: 401 });
  }


  const { searchParams } = new URL(req.url);
  const days = Number(searchParams.get('days') || 30);

  
  const data = await getSalesData(session.user.id, days);

  const formatted = formatReportData(data);
  const pdfBuffer = await exportToPDF(formatted);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=report-${days}dias.pdf`,
    },
  });
}