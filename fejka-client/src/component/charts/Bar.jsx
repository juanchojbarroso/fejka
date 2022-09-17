import React, { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Flex,
  Spacer,
  Center,
  FormLabel,
  Switch,
  Checkbox
} from "@chakra-ui/react";
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
import { getValueFromSelectedKeys } from "../../utils/value";

const CHART_NAME = "BarChart";
const queryCache = new QueryCache({
  onError: (error) => {
    console.log(error);
  },
  onSuccess: (data) => {
    console.log(data);
  },
});

export function BarChart() {
  // GLOBAL
  const { dataSet } = useDataSet();
  const dataSetID = dataSet?.id;
  const { data: keys } = useDataSetKeys();
  const { selectedKeys, updateSelectedKeys } = useSelectedKeys();

  // LOCAL
  const [edaModo, setEdaModo] = useState(true);
  const [axisX, setAxisX] = useState(null);
  const [axisY, setAxisY] = useState(null);
  const [isVertical, setIsvertical] = useState(false);
  const columns = [axisX, axisY, ...getValueFromSelectedKeys(selectedKeys)];
  const shouldfetchData = Boolean(axisX) && Boolean(axisY);

  const { data, error, isError, isLoading, refetch } = useQuery(
    [CHART_NAME],
    () => fetchDatasourcesDataset(dataSetID, columns, edaModo),
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

  const options = {
    chart: {
      title: `${dataSet?.name} / ${CHART_NAME}`,
    },
    bars: !isVertical ? "vertical" : "horizontal",
    isStacked: true,
    height: 500,
    legend: { position: "top" },
    hAxis: { minValue: 0 },
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
        <GridItem w="50%" h="10">
          <Checkbox isChecked={edaModo} onChange={() => setEdaModo(!edaModo)}>
            EDA
          </Checkbox>
        </GridItem>
        <GridItem w="100%" h="10" colEnd={6}>
          <Flex>
            <Center w="220px">
              <FormLabel htmlFor="isChecked">Vertical</FormLabel>
              <Spacer />
              <Switch
                id="isChecked"
                isChecked={isVertical}
                onChange={() => setIsvertical(!isVertical)}
              />
              <Spacer />
              <FormLabel htmlFor="isChecked">Horizontal</FormLabel>
            </Center>
          </Flex>
        </GridItem>
      </Grid>
      {!Boolean(data) ? (
        <Info
          heading="Falta una cosilla..."
          text="Es necesario el valor de 'Axis X' y 'Axis Y' para ver el grafico"
        />
      ) : (
        <Chart
          chartType="Bar"
          width="100%"
          height="400px"
          data={data}
          options={options}
          isStacked={true}
        />
      )}
    </>
  );
}
