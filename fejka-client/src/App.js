import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import {
  Box,
  Divider,
  Container,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { DataSetSelector, DataSetLink, DataSetKeys } from "./component";
// import LineChart from "./screens/LineChart";
import Charts from "./screens/Charts";
import NotFound from "./screens/NotFound";
import { useChartsList } from "./hooks/charts";

import "./App.css";

function AppRouter() {
  const { chartsList } = useChartsList();
  return (
    <Router>
      <Routes>
        <Route path="charts" element={<Charts />}>
          <>
            {chartsList.map((chart, index) => {
              return (
                <Route
                  key={index}
                  path={chart.path}
                  element={chart.component}
                />
              );
            })}
          </>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

function AppBar() {
  return (
    <Flex minWidth="max-content" alignItems="center" gap="2">
      <Box p="4">
        <Heading size="md">FejkaPP</Heading>
      </Box>
      <Spacer />
      <Box padding="4" w="50%">
        <DataSetSelector />
      </Box>
      <Spacer />
      <Box padding="4">
        <DataSetLink />
      </Box>
    </Flex>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AppBar />
        <Divider orientation="horizontal" />
        <Box padding="4">
          <DataSetKeys />
        </Box>
        <Divider orientation="horizontal" />
        <Container maxW="s">
          <AppRouter />
        </Container>
      </header>
    </div>
  );
}

export default App;
