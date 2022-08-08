import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Charts from "../screens/Charts";
import NotFound from "../screens/NotFound";
import { useChartsList } from "../hooks/charts";

export function AppRouter() {
  const { chartsList } = useChartsList();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="charts" element={<Charts />}>
        <>
          {chartsList.map((chart, index) => {
            return (
              <Route key={index} path={chart.path} element={chart.component} />
            );
          })}
        </>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
