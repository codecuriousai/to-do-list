
async function fetchData(endpoint) {
  const r = await fetch(endpoint);
  const data = await r.text();

  const result = eval(data);
  return result;
}
