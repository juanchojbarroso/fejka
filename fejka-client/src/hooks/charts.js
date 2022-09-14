import React from "react";
import {
  LineChart,
  BarChart,
  ScatterChart,
  HistogramChart,
  BoxplotsChart,
  DensityCurveChart,
  SankeyChart,
  SimplePieChart,
  GeoChart,
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
    name: "Scatter",
    path: "scatter",
    component: <ScatterChart />,
  },
  {
    name: "Histogram",
    path: "histogram",
    component: <HistogramChart />,
  },
  {
    name: "Boxplots",
    path: "boxplots",
    component: <BoxplotsChart />,
  },
  {
    name: "Density Curve",
    path: "densityCurve",
    component: <DensityCurveChart />,
  },
  {
    name: "Sankey",
    path: "sankey",
    component: <SankeyChart />,
  },
  {
    name: "Simple Pie",
    path: "simple-pie",
    component: <SimplePieChart />,
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
