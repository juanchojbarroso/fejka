import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Selector from "./components/Selector";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Container from '@mui/material/Container';
import "./App.css";

import MainDashboard from "./screens/main-dashboard";

function App() {
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            Fejka
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xl">
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={8}
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
            >
              <Selector />
            </Grid>
          </Grid>
          <MainDashboard />
        </Stack>
      </Container>
    </div>
  );
}

export default App;
