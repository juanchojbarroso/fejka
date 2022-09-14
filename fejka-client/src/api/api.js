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

const fetchDatasourcesDataset = async (id, columns = []) => {
  try {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/datasources/${id}/dataset`,
      {
        method: "POST",
        body: JSON.stringify({ columns }),
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export { fetchDataSets, fetchDataSetsKeys, fetchDatasourcesDataset };
