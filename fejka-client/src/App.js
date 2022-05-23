import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { DatasourcesSelector } from "./component";
import "./App.css";

function App() {
  const [datasource, setDatasource] = useState({});
  return (
    <div className="App">
      <header className="App-header">
        <Box w="100%" p={4} color="white">
          <Text fontSize="3xl">{datasource.name}</Text>
          <Text fontSize="xs">{datasource.url}</Text>
        </Box>
        <Box w="100%" p={4} color="white">
          <DatasourcesSelector
            onSelectChange={(datasourceSelected) => {
              setDatasource(datasourceSelected);
            }}
          />
        </Box>
        <Box w="100%" p={4} color="white">
            
        </Box>
      </header>
    </div>
  );
}

export default App;
