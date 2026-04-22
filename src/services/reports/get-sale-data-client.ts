export async function getSalesDataClient(days = 30) {
  const res = await fetch(`/api/reports/sales?days=${days}`);
  const json = await res.json();

  return json.data;
}