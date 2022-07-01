import { Box, Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Center>
      <Box>
        <Heading my={3}>Achieve your goals in a flash.</Heading>
        <Box>Start learning</Box>
      </Box>
    </Center>
  );
};

export default Home;
