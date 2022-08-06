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

export { fetchDataSets, fetchDataSetsKeys };

// function fetchDatasourcesDataset({id}) {
//   return fetch(`${process.env.REACT_APP_API_URL}/datasources/${id}/dataset`).then((res) => {
//     const result = res.json();
//     return result;
//   });
// }
