import React, { useEffect, useState } from "react";
import { Grid, GridItem, Select, Stack, Checkbox } from "@chakra-ui/react";
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
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [linesSet, setLinesSet] = useState([]);

  console.log(linesSet);
  return (
    <Grid
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(10, 1fr)"
      gap={4}
    >
      <GridItem colSpan={3}>
        <Stack spacing={4} align="center">
          <Select
            placeholder="Select X axis value"
            onChange={(e) => {
              setXAxis(e.target.value);
            }}
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
          <CustomCheckBox
            options={labels}
            checkedLabels={linesSet}
            onCheckedChange={(checkedItems) => setLinesSet(checkedItems)}
          />
        </Stack>
      </GridItem>
      <GridItem colSpan={7}>
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
          {linesSet.map((dataKey, index) => {
            debugger;
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={dataKey}
                stroke={getRandomColor()}
              />
            );
          })}
        </LineChart>
      </GridItem>
    </Grid>
  );
}

function CustomCheckBox({ options = [], checkedLabels = [], onCheckedChange }) {
  const [state, setState] = useState({ selections: [] });

  useEffect(() => {
    onCheckedChange(state.selections);
  }, [state]);

  function handleCheckboxChange(key) {
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1) {
      sel.splice(find, 1);
    } else {
      sel.push(key);
    }

    setState({
      selections: sel,
    });
  }

  return (
    <Stack>
      {options.map((option, index) => {
        return (
          <Checkbox
            key={option}
            onChange={() => handleCheckboxChange(option)}
            isChecked={state.selections.includes(option)}
          >
            {option}
          </Checkbox>
        );
      })}
    </Stack>
  );
}
