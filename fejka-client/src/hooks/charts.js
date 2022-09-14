import React, { useState } from "react";
import {
  LineChart,
  BarChart,
  SimplePieChart,
  ScatterChart,
  GeoChart,
  HistogramChart
} from "../component/charts";
import { useLocalStorage } from "../hooks/local-store";

const defaultChartsList = [
  {
    name: "Line",
    path: "line",
    component: <LineChart />
  },
  {
    name: "Bar",
    path: "bar",
    component: <BarChart />
  },
];

const fullChartsList = [
  ...defaultChartsList,
  {
    name: "Histogram",
    path: "histogram",
    component: <HistogramChart />,
  },
  {
    name: "Simple Pie",
    path: "simple-pie",
    component: <SimplePieChart />,
  },
  {
    name: "Scatter",
    path: "scatter",
    component: <ScatterChart />,
  },
  {
    name: "Geo",
    path: "geo",
    component: <GeoChart />,
  },
];

export function useChartsList() {
  const [chartsList, setchartsList] = useLocalStorage("ChartsList", defaultChartsList)

  function addNewChart(chart) {
    setchartsList([...chartsList, chart]);
  }

  return {
    defaultChartsList,
    fullChartsList,
    chartsList,
    addNewChart,
  };
}
