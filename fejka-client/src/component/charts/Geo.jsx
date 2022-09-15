import React, { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import { useQuery } from "react-query";
import { QueryCache } from "react-query";
import Info from "../Info";
import Error from "../Error";
import Warning from "../Warning";
import { useDataSetKeys } from "../../hooks/dataset";
import { useDataSet } from "../../contexts/DataSets";
import { useSelectedKeys } from "../../contexts/SelectedKeys";
import AxisSelector from "../AxisSelector";
import { fetchDatasourcesDataset } from "../../api";
import {
  getValueFromSelectedKeys,
  transformDataToGoogleDataTable,
} from "../../utils/value";

const CHART_NAME = "GeoChart";
const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

export function GeoChart() {
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
    [CHART_NAME],
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
    updateSelectedKeys([]);
    queryCache.clear();
  }, [dataSet]);


  if (!Boolean(dataSet)) {
    return (
      <Warning
        heading="Falta lo más importante!"
        text="Tienes que seleccionar un dataset."
      />
    );
  }
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
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                const region = data[selection[0].row + 1];
                console.log("Selected : " + region);
              },
            },
          ]}
          chartType={CHART_NAME}
          width="100%"
          height="400px"
          data={transformDataToGoogleDataTable(data)}
        />
      )}
    </>
  );
}

// export const data = [
//   ["Country", "Popularity"],
//   ["Germany", 200],
//   ["United States", 300],
//   ["Brazil", 400],
//   ["Canada", 500],
//   ["France", 600],
//   ["RU", 700],
// ];
