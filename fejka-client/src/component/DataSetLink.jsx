import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useDataSet } from "../contexts/DataSet";

export default function DataSetLink() {
  const { DataSet } = useDataSet();
  debugger;
  return (
    <Box>
      {!!DataSet ? (
        <>
          <Link href={DataSet.url} isExternal>
            <Text fontSize="xs">
              Go to DataSet
              <ExternalLinkIcon mx="2px" />
            </Text>
          </Link>
        </>
      ) : null}
    </Box>
  );
}
