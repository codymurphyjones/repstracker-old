async function index(properties, context) {
  console.error("LIST", properties.list);
  const length = await properties.list.length();

  const list = await properties.list.get(0, length);

  console.error("LIST:", list);
  return { index: list.indexOf(properties.item) };
}
