export function getValueFromSelectedKeys(keys) {
  if (!Boolean(keys)) {
    return;
  }
  const values = keys.map((key) => key.value);
  return values;
}
