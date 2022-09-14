import React, { useEffect } from "react";
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
  TagLabel,
  Flex,
} from "@chakra-ui/react";
import DataSetLink from "./DataSetLink";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useDataSet } from "../contexts/DataSets";
import { useDataSetKeys } from "../hooks/dataset";
import { Kbd } from "@chakra-ui/react";

export default function DataSetKeys() {
  const { dataSet } = useDataSet();

  const dataSetID = dataSet?.id;

  const { data: keys, status, refetch } = useDataSetKeys();

  useEffect(() => {
    if (!dataSetID) {
      return;
    }
    return () => {
      refetch();
    };
  }, [refetch, dataSetID]);

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
            <TagLabel>Dataset keys</TagLabel>
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
      <Box w={"10%"}>
        <DataSetLink />
      </Box>
    </Flex>
  );
}
