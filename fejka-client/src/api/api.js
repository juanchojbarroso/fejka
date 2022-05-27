function fetchDatasources() {
  return fetch(`${process.env.REACT_APP_API_URL}/datasources`).then((res) => {
    const result = res.json();
    return result;
  });
}

function fetchDatasourcesLabes({id}) {
  return fetch(`${process.env.REACT_APP_API_URL}/datasources/${id}/dataset/labels`).then((res) => {
    const result = res.json();
    return result;
  });
}

function fetchDatasourcesDataset({id}) {
  return fetch(`${process.env.REACT_APP_API_URL}/datasources/${id}/dataset`).then((res) => {
    const result = res.json();
    return result;
  });
}



export { fetchDatasources, fetchDatasourcesDataset, fetchDatasourcesLabes};
