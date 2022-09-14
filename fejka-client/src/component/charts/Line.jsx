import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { useQuery } from "react-query";
import Info from "../Info";
import Error from "../Error";
import { useDataSetKeys } from "../../hooks/dataset";
import { useDataSet } from "../../contexts/DataSets";
import { useSelectedKeys } from "../../contexts/SelectedKeys";
import AxisSelector from "../AxisSelector";
import { fetchDatasourcesDataset } from "../../api";
import { getValueFromSelectedKeys } from "../../utils/value";

export function LineChart() {
  // GLOBAL
  const { dataSet } = useDataSet();
  const dataSetID = dataSet?.id;
  const { data: keys } = useDataSetKeys();
  const { selectedKeys, updateSelectedKeys } = useSelectedKeys();

  // LOCAL
  const [axisX, setAxisX] = useState(null);
  const [axisY, setAxisY] = useState(null);
  const columns = [axisX, axisY, ...getValueFromSelectedKeys(selectedKeys)];
  const shouldfetchData = Boolean(axisX) && Boolean(axisY);

  const { data, error, isError, isLoading, refetch } = useQuery(
    ["datasetData"],
    () => fetchDatasourcesDataset(dataSetID, columns),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    async function fetchData() {
      refetch();
    }
    if (shouldfetchData) {
      fetchData();
    }
  }, [axisX, axisY, selectedKeys]);

  useEffect(() => {
    setAxisX(null);
    setAxisY(null);
    updateSelectedKeys([])
  }, [dataSet]);

  const options = {
    chart: {
      title: "Box Office Earnings in First Two Weeks of Opening",
      subtitle: "in millions of dollars (USD)",
    },
  };

  if (isLoading) {
    return (
      <Info
        heading="Loading.."
        text="Los perezosos pueden aguantar más tiempo el aliento que los delfines"
      />
    );
  }
  if (isError) {
    return <Error heading="Uppss algo fue mal." text={error} />;
  }
  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%" h="10">
          <AxisSelector
            value={axisX}
            placeholder="Axis X"
            isDisabled={false}
            onChange={(e) => {
              console.log(e);
              setAxisX(e.target.value);
            }}
            keys={keys}
          />
        </GridItem>
        <GridItem w="100%" h="10">
          <AxisSelector
            value={axisY}
            placeholder="Axis Y"
            isDisabled={false}
            onChange={(e) => {
              console.log(e);
              setAxisY(e.target.value);
            }}
            keys={keys}
          />
        </GridItem>
      </Grid>
      {!Boolean(data) ? (
        <Info
          heading="Falta una cosilla..."
          text="Es necesario el valor de 'Axis X' y 'Axis Y' para ver el grafico"
        />
      ) : (
        <Chart
          chartType="Line"
          width="100%"
          height="400px"
          data={transformDataToGoogleDataTable(data)}
          options={options}
        />
      )}
    </>
  );
}

function transformDataToGoogleDataTable(data) {
  const { columns, data: newData } = data;
  const googleDataTable = [columns, ...newData];
  return googleDataTable;
}
