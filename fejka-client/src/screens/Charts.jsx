import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  TabList
} from "@chakra-ui/react";
import { useChartsList } from "../hooks/charts";
import AddNewMenu from "../component/AddNewMenu";

export default function Charts() {
  const { chartsList, addNewChart } = useChartsList();
  return (
    <Box p="4">
      <Tabs variant="soft-rounded" colorScheme="green">
        <TabList>
          {chartsList.map((chart, index) => {
            return (
              <Link key={index} to={chart.path}>
                <Tab>{chart.name}</Tab>
              </Link>
            );
          })}
          <Tab>
            <AddNewMenu
              items={chartsList}
              onSelect={(chart) => addNewChart(chart)}
            />
          </Tab>
        </TabList>
        <Box>
          <Outlet />
        </Box>
      </Tabs>
    </Box>
  );
}
