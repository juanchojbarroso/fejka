import React, { useState } from "react";

export function useChartsList() {
  const defaultChartsList = [
    {
      name: "one",
      path: "one",
      component: <p>one!</p>,
    },
    {
      name: "two",
      path: "two",
      component: <p>two!</p>,
    },
  ];

  const [chartsList, setchartsList] = useState(defaultChartsList);

  function addNewChart(chart) {
    setchartsList([...chartsList, chart]);
  }

  return {
    chartsList,
    addNewChart,
  };
}
