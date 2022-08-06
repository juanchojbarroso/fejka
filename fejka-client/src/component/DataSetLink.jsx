import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useDataSet } from "../contexts/DataSets";

export default function DataSetLink() {
  const { dataSet } = useDataSet();
  return (
    <Box>
      {!!dataSet ? (
        <>
          <Link href={dataSet.url} isExternal>
            <Text fontSize="xs">
              Go to dataset
              <ExternalLinkIcon mx="2px" />
            </Text>
          </Link>
        </>
      ) : null}
    </Box>
  );
}
