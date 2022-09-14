export function getValueFromSelectedKeys(keys) {
  if (!Boolean(keys)) {
    return;
  }
  const values = keys.map((key) => key.value);
  return values;
}

export function transformDataToGoogleDataTable(data) {
  const { columns, data: newData } = data;
  const googleDataTable = [columns, ...newData];
  return googleDataTable;
}
