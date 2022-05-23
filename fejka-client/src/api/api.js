function fetchDatasources() {
  return fetch(`${process.env.REACT_APP_API_URL}/datasources`).then((res) => {
    const result = res.json();
    return result;
  });
}

export { fetchDatasources };
