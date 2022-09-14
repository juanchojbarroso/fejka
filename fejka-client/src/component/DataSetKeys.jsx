import React, { useEffect, useState } from "react";
import {
  Box,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Tag,
  TagLeftIcon,
  Flex,
} from "@chakra-ui/react";
import { Select, useChakraSelectProps } from "chakra-react-select";
import DataSetLink from "./DataSetLink";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useDataSet } from "../contexts/DataSets";
import { useSelectedKeys } from "../contexts/SelectedKeys";
import { useDataSetKeys } from "../hooks/dataset";
import { Kbd } from "@chakra-ui/react";

export default function DataSetKeys() {
  const { dataSet } = useDataSet();
  const { data: keys, status, refetch } = useDataSetKeys();
  const dataSetID = dataSet?.id;
  const {selectedKeys, updateSelectedKeys} = useSelectedKeys();

  useEffect(() => {
    if (!dataSetID) {
      return;
    }
    return () => {
      refetch();
    };
  }, [refetch, dataSetID]);

  const selectProps = useChakraSelectProps({
    isMulti: true,
    value: selectedKeys,
    isMulti: true,
    onChange: updateSelectedKeys,
    tagVariant: "solid",
    options: getCurrentKeys(),
  });

  function getCurrentKeys() {
    if (!Boolean(keys)) {
      return [];
    }
    const currentKey = keys.map((key, index) => {
      return {
        label: `${index}. ${key}`,
        value: key,
      };
    });
    
    return currentKey;
  }

  if (!dataSet) {
    return (
      <Box>
        <Kbd>Not dataset selected</Kbd>
      </Box>
    );
  }
  if (status === "loading") {
    return (
      <Box w="100%" p={4} alignContent="center">
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
          <AlertDescription>Error fetching dataset keys!</AlertDescription>
        </Alert>
      </>
    );
  }
  return (
    <Flex alignItems="center" gap="4">
      <Box mt="1" fontWeight="semibold" noOfLines={1}>
        <HStack spacing={4}>
          <Tag variant="subtle" colorScheme="cyan">
            <TagLeftIcon boxSize="12px" as={InfoOutlineIcon} />
            <DataSetLink />
          </Tag>
        </HStack>
      </Box>
      <Box w={"70%"}>
        {!!"dataSet" ? (
          <>
            {keys.map((key, index) => (
              <>
                <Kbd key={`datasetkeys-${index}`}>{key}</Kbd>
                {"   "}
              </>
            ))}
          </>
        ) : null}
      </Box>
      <Box w={"50%"}>
        <Select {...selectProps} />
      </Box>
    </Flex>
  );
}
