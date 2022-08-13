import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, TabList } from "@chakra-ui/react";
import { useChartsList } from "../hooks/charts";
import AddNewMenu from "../component/AddNewMenu";

export default function Charts() {
  const { fullChartsList, chartsList, addNewChart } = useChartsList();
  let navigate = useNavigate();
  return (
    <Box p="4">
      <Tabs variant="soft-rounded" colorScheme="gray">
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
              items={fullChartsList}
              onSelect={(chart) => {
                navigate(`${chart.path}`);
                addNewChart(chart);
              }}
            />
          </Tab>
        </TabList>
        <Box p="8">
          <Outlet />
        </Box>
      </Tabs>
    </Box>
  );
}
