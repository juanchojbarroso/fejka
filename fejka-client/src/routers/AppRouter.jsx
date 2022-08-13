import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/Home";
import Charts from "../screens/Charts";
import NotFound from "../screens/NotFound";
import { useChartsList } from "../hooks/charts";

export function AppRouter() {
  const { fullChartsList } = useChartsList();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="charts" element={<Charts />}>
        <>
          {fullChartsList.map((chart, index) => {
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
