import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Select,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { getRandomColor } from "../utils/color";



export default function LineChartComponent({ data, labels = [] }) {
  const [xAxis, setXAxis] = useState(labels[0]);
  const [yAxis, setYAxis] = useState("");
  const [linesSet, setLinesSet] = useState(["uv"]);

  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(10, 1fr)"
      gap={4}
    >
      <GridItem colSpan={3} >
        <Select
          placeholder="Select X axis value"
          onChange={(e) => setXAxis(e.target.value)}
        >
          {labels.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
        <Select
          placeholder="Select Y axis value"
          onChange={(e) => setYAxis(e.target.value)}
        >
          {labels.map((option, index) => {
            return (
              <option key={index} value={option}>
                {option}
              </option>
            );
          })}
        </Select>
        <Stack>
          {labels.map((option, index) => {
            return <Checkbox isDisabled={false}>{option}</Checkbox>;
          })}
        </Stack>
      </GridItem>
      <GridItem colSpan={7} >
        <LineChart
          width={700}
          height={640}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxis} />
          <YAxis dataKey={yAxis} />
          <Tooltip />
          <Legend />
          {linesSet.map((dataKey, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={dataKey}
              stroke={getRandomColor()}
            />
          ))}
        </LineChart>
      </GridItem>
    </Grid>
  );
}