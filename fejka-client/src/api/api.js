import {
  transformDataToGoogleDataTable,
  transformDataTableToGoogleDataTable
} from "../utils/value";


const fetchDataSets = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/datasources`);
  return res.json();
};

const fetchDataSetsKeys = async (id) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/datasources/${id}/dataset/labels`
  );
  return res.json();
};

const fetchDatasourcesDataset = async (id, columns = [], isEdaModo) => {
  const baseUrl = `${process.env.REACT_APP_API_URL}/datasources/${id}`;
  const url = isEdaModo
    ? `${baseUrl}/dataset/countBy`
    : `${baseUrl}/dataset`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ columns, target: columns[0], feature: columns[1] }),
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const response =  res.json()
    const data = await response
    debugger
    if (isEdaModo) {
      return transformDataTableToGoogleDataTable(data)
    }
    return transformDataToGoogleDataTable(data)
  } catch (error) {
    console.error(error);
  }
};

export { fetchDataSets, fetchDataSetsKeys, fetchDatasourcesDataset };
