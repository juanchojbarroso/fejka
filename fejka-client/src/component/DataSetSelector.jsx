import React from "react";
import { useQuery } from "react-query";
import {
  Box,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select,
} from "@chakra-ui/react";
import { useDataSet } from "../contexts/DataSets";
import { fetchDataSets } from "../api";

export default function DataSetSelector() {
  const { dataSet, updateDataSet } = useDataSet();
  const { data: dataSets, status } = useQuery("datasets", fetchDataSets);
  if (status === "loading") {
    return (
      <Box w="100%" p={4}>
        <Skeleton height="40px" />
      </Box>
    );
  }
  if (status === "error") {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Algo fue mal..</AlertTitle>
          <AlertDescription>
            No existen DataSet para selecionar
          </AlertDescription>
        </Alert>
      </>
    );
  }
  return (
    <>
      <Select
        value={dataSet?.id}
        placeholder="Select option"
        onChange={(e) => {
          updateDataSet(dataSets.find((item) => item.id === e.target.value));
        }}
      >
        {dataSets.map((option, index) => {
          return (
            <option key={index} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </Select>
    </>
  );
}
