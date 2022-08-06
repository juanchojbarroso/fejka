import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Link,
} from "react-router-dom";
import { Divider, Container } from "@chakra-ui/react";
import { DataSetSelector, DataSetLink } from "./component";
// import LineChart from "./screens/LineChart";
import NotFound from "./screens/NotFound";

import "./App.css";

function Charts() {
  return (
    <div>
      <nav>
        <Link to="linechart">Invoices</Link> |
        <Link to="linechart">Dashboard</Link>
      </nav>
      <Divider orientation="horizontal" />
      <div className="content">
        <Outlet />
      </div>
    </div>
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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <DataSetSelector />
          <DataSetLink />
        </Container>
        <AppRouter />
      </header>
    </div>
  );
}

export default App;
