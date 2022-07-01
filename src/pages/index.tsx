// import { trpc } from '@/lib/trpc';
import { Box, Text, Button, Center, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  // const { data, isLoading } = trpc.useQuery(['hello', { text: 'Ben' }]);

  return (
    <Center>
      <Box>
        <Heading as="h1" my={3}>
          Achieve your goals in a flash.
        </Heading>
        <Box my={10} />
        <Text textAlign="center">Start learning</Text>
        <Box my={10} />
        <Box display="flex" my={2} gap={2} justifyContent="center">
          <Button backgroundColor="yellow.300" w={150}>
            Create new Flash
          </Button>
          <Button backgroundColor="yellow.300" w={150}>
            Create new Set
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default Home;
