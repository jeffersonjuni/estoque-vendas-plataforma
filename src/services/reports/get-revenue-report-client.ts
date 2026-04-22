export async function getRevenueReportClient() {
  const res = await fetch('/api/reports/revenue');

  const json = await res.json();

  return json.data;
}