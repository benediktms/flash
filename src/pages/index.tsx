import { trpc } from "@/utils/trpc";
import { Box, Center, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["hello", { text: "Ben" }]);

  return (
    <Center>
      <Box>
        <Heading my={3}>Achieve your goals in a flash.</Heading>
        <Box>Start learning</Box>
        {isLoading && "Loading"}
        {data && data.greeting}
      </Box>
    </Center>
  );
};

export default Home;
