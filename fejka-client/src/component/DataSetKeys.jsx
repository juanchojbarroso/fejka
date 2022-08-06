import React, { useEffect } from "react";
import { useQuery } from "react-query";
import {
  Box,
  Skeleton,
  Text,
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
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useDataSet } from "../contexts/DataSets";
import { Kbd } from "@chakra-ui/react";
import { fetchDataSetsKeys } from "../api";

export default function DataSetKeys() {
  const { dataSet } = useDataSet();

  const dataSetID = dataSet?.id;

  const {
    data: keys,
    status,
    refetch,
  } = useQuery(["datasetsKeys", dataSetID], () => fetchDataSetsKeys(dataSetID));

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
      <Box w={"80%"}>
        {!!"dataSet" ? (
          <>
            {keys.map((key) => (
              <>
                <Kbd>{key}</Kbd>
                {"   "}
              </>
            ))}
          </>
        ) : null}
      </Box>
    </Flex>
  );
}
