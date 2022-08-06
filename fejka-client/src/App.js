import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
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
import NotFound from "./screens/NotFound";

import "./App.css";

function Charts() {
  return (
    <>
      <nav>
        <Link to="linechart">Invoices</Link> |
        <Link to="linechart">Dashboard</Link>
      </nav>
      <Divider orientation="horizontal" />
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="charts" element={<Charts />}>
          {/* <Route path="linechart" element={<LineChart />} /> */}
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
