import React from "react";
import {
  Box,
  Divider,
  Container,
  Flex,
  Spacer,
  Heading,
} from "@chakra-ui/react";
import { AppRouter } from "./routers/AppRouter";
import { DataSetSelector, DataSetLink, DataSetKeys } from "./component";
import MainMenu from "./component/MainMenu";

import "./App.css";

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
        <MainMenu />
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
