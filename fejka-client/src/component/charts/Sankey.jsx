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

const CHART_NAME = "SankeyChart";
const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

export function SankeyChart() {
  // GLOBAL
  const { dataSet } = useDataSet();
  const dataSetID = dataSet?.id;
  const { data: keys } = useDataSetKeys();
  const { selectedKeys, updateSelectedKeys } = useSelectedKeys();

  // LOCAL
  const [axisX, setAxisX] = useState(null);
  const [axisY, setAxisY] = useState(null);
  const [axisZ, setAxisZ] = useState(null);
  const columns = [axisX, axisY, ];
  const shouldfetchData = Boolean(axisX) && Boolean(axisY) && Boolean(axisZ);

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
  }, [axisX, axisY, axisZ]);

  useEffect(() => {
    setAxisX(null);
    setAxisY(null);
    updateSelectedKeys([]);
    queryCache.clear();
  }, [dataSet]);

  const options = {
    chart: {
      title: `${dataSet?.name} / ${CHART_NAME}`
    },
  };

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
            placeholder="From"
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
            placeholder="To"
            isDisabled={false}
            onChange={(e) => {
              console.log(e);
              setAxisY(e.target.value);
            }}
            keys={keys}
          />
        </GridItem>
        <GridItem w="100%" h="10">
          <AxisSelector
            value={axisZ}
            placeholder="Weight"
            isDisabled={false}
            onChange={(e) => {
              console.log(e);
              setAxisZ(e.target.value);
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
          chartType={"Sankey"}
          width="100%"
          height="400px"
          data={transformDataToGoogleDataTable(data)}
          options={options}
        />
      )}
    </>
  );
}


export const data = [
  ["From", "To", "Weight"],
  ["A", "X", 5],
  ["A", "Y", 7],
  ["A", "Z", 6],
  ["B", "X", 2],
  ["B", "Y", 9],
  ["B", "Z", 4],
];
