import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Box, Text, Container, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { DatasourcesSelector, LineChartComponent } from "./component";
import {
  fetchDatasources,
  fetchDatasourcesDataset,
  fetchDatasourcesLabes,
} from "./api";

import "./App.css";

function App() {
  const [datasources, setDatasources] = useState([]);
  const [datasource, setDatasource] = useState({});
  const [dataset, setDataset] = useState([]);
  const [labels, setLabels] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datasources = await fetchDatasources();
        setDatasources(datasources);
      } catch (error) {
        throw Error(error);
      }
    };

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const labels = await fetchDatasourcesLabes({ id: datasource.id });
        const dataset = await fetchDatasourcesDataset({ id: datasource.id });
        setLabels(labels);
        setDataset(dataset);
      } catch (error) {
        throw Error(error);
      }
    };

    if (!!datasource.id) {
      setLabels([]);
      setDataset([]);
      fetchData().catch(console.error);
    }
  }, [datasource]);

  return (
    <div className="App">
      <header className="App-header">
        <Container maxW="container.lg" bg="" color="">
          <Box w="100%" p={4}>
            {!!datasource ? (
              <>
                <Text fontSize="3xl">{datasource.name}</Text>
                <Link href={datasource.url} isExternal>
                  <Text fontSize="xs">
                    Go to datasource
                    <ExternalLinkIcon mx="2px" />
                  </Text>
                </Link>
              </>
            ) : null}
          </Box>
          <Box w="100%" p={4}>
            <DatasourcesSelector
              options={datasources}
              onSelectChange={(datasourceSelected) => {
                setDatasource(datasourceSelected);
              }}
            />
          </Box>
          <Box bg={"white"} w="100%" p={4}>
            <LineChartComponent data={dataset} labels={labels} />
          </Box>
        </Container>
      </header>
    </div>
  );
}

export default App;
