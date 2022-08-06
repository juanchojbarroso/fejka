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
import { useDataSet } from "../contexts/DataSet";
import { useDataApi } from "../hooks/api";
import {} from "@chakra-ui/react";

export default function DataSetSelector() {
  const { DataSet, updateDataSet } = useDataSet();

  const [{ data: DataSet, isLoading, isError }] = useDataApi(
    `${process.env.REACT_APP_API_URL}/DataSet`,
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
          value={DataSet?.id}
          placeholder="Select option"
          onChange={(e) => {
            updateDataSet(
              DataSet.find((item) => item.id === e.target.value)
            );
          }}
        >
          {DataSet.map((option, index) => {
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
