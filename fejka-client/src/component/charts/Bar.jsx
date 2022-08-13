import React from "react";
import { Chart } from "react-google-charts";

export const data = [
  ["brand", "Blue", "Red", "Yellow"],
  ["Chevlolete", 1000, 400, 200],
  ["Toyota", 1170, 460, 250],
  ["Seat", 660, 1120, 300],
  ["Fiat", 1030, 540, 350],
];

export const options = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales, Expenses, and Profit: 2014-2017",
  },
};

export function BarChart() {
  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
