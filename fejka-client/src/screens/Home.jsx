import React from "react";
import { Link, Box, Flex, Text, Center, Icon } from "@chakra-ui/react";
import { FcPieChart } from "react-icons/fc";

export default function Home() {
  return (
    <Flex alignItems="center">
      <Box w="100%" h="100%">
        <Link href={"/charts"}>
          <Center>
            <Icon as={FcPieChart} w={20} h={20} />
            <Text
              bgGradient="linear(to-l, #7928CA, #FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              Go to Charts
            </Text>
          </Center>
        </Link>
      </Box>
    </Flex>
  );
}
