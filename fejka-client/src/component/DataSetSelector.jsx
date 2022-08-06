import React from "react";
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
import { useDataApi } from "../hooks/api";
import {} from "@chakra-ui/react";

export default function DataSetSelector() {
  const { dataSet, updateDataSet } = useDataSet();

  const [{ data: dataSets, isLoading, isError }] = useDataApi(
    `${process.env.REACT_APP_API_URL}/datasources`,
    []
  );
  if (isLoading) {
    return (
      <Box w="100%" p={4}>
        <Skeleton height="40px" />
      </Box>
    );
  }
  if (isError) {
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
      <Box>
        <Select
          value={dataSet?.id}
          placeholder="Select option"
          onChange={(e) => {
            updateDataSet(
              dataSets.find((item) => item.id === e.target.value)
            );
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
      </Box>
    </>
  );
}
