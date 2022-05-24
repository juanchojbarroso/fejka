import React, { useState } from "react";
import {
  Box,
  Text,
  Container,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { DatasourcesSelector, LineChartComponent } from "./component";
import { data, labels } from "./api";

import "./App.css";

function App() {
  const [datasource, setDatasource] = useState({});
  return (
    <div className="App">
      <header className="App-header">
        <Container maxW="container.lg" bg="" color="">
          <Box w="100%" p={4}>
            <Text fontSize="3xl">{datasource.name}</Text>
            <Link href={datasource.url} isExternal>
              <Text fontSize="xs">
                Go to datasource
                <ExternalLinkIcon mx="2px" />
              </Text>
            </Link>
          </Box>
          <Box w="100%" p={4}>
            <DatasourcesSelector
              onSelectChange={(datasourceSelected) => {
                setDatasource(datasourceSelected);
              }}
            />
          </Box>
          <Box bg={"white"} w="100%" p={4} >
            <LineChartComponent data={data} labels={labels} />
          </Box>
        </Container>
      </header>
    </div>
  );
}


export default App;
