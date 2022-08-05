import React from "react";
import { Box, Text, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useDataSource } from "../contexts/DataSource";

export default function DatasourcesLink() {
  const { dataSource } = useDataSource();
  debugger;
  return (
    <Box>
      {!!dataSource ? (
        <>
          <Link href={dataSource.url} isExternal>
            <Text fontSize="xs">
              Go to datasource
              <ExternalLinkIcon mx="2px" />
            </Text>
          </Link>
        </>
      ) : null}
    </Box>
  );
}
