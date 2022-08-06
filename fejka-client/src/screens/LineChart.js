import React, { useEffect, useState } from "react";
import { Box, Text, Container, Link } from "@chakra-ui/react";
import { LineChartComponent } from "../component";
import {
  fetchDataSet,
  fetchDataSetDataset,
  fetchDataSetLabes,
} from "../api";

import {  } from "";

export default function LineChart() {
  const [dataset, setDataset] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataset = await fetchDataSetDataset({ id: DataSet.id });
        setLabels(labels);
        setDataset(dataset);
      } catch (error) {
        throw Error(error);
      }
    };

    if (!!DataSet.id) {
      setLabels([]);
      setDataset([]);
      fetchData().catch(console.error);
    }
  }, [DataSet]);

  return (
    <Container maxW="container.lg" bg="" color="">
      <Box bg={"white"} w="100%" p={4}>
        <LineChartComponent data={dataset} labels={labels} />
      </Box>
    </Container>
  );
}


