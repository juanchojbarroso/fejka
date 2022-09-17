export function getValueFromSelectedKeys(keys) {
  if (!Boolean(keys)) {
    return;
  }
  const values = keys.map((key) => key.value);
  return values;
}

export function transformDataToGoogleDataTable(data) {
  debugger
  const { columns, data: newData } = data;
  const googleDataTable = [columns, ...newData];
  return googleDataTable;
}

export function transformDataTableToGoogleDataTable(data) {
  const { data: result } = data;
  const keys = Object.keys(result[0]);
  const values = [];
  result.forEach((item) => {
    console.log(Object.values(item));
    return values.push(Object.values(item));
  });
  return [keys, ...values];
}
