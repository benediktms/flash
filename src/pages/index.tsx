import { trpc } from '@/lib/trpc';
import { Box, Text, Button, Center, Heading } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';
import { z } from 'zod';
import { Form } from '../components/Form';
import LabeledTextField from '../components/LabeledTextField';
import { createFlashCardSchema } from '../validators/createFlashCard';

const Home: NextPage = () => {
  const [showFlashCardForm, setShowFlashCardForm] = useState(false);

  const createFlashCardMutation = trpc.useMutation(['flashCard.create'], {
    async onSuccess() {
      await trpc.useContext().invalidateQueries(['flashCard.all']);
    },
  });

  const handleCreateFlashCardMutation = async (
    input: z.infer<typeof createFlashCardSchema>
  ) => {
    try {
      await createFlashCardMutation.mutateAsync(input);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Center>
      <Box>
        <Heading as="h1" my={3}>
          Achieve your goals in a flash.
        </Heading>
        <Box my={10} />
        <Text textAlign="center">Start learning</Text>
        <Box my={10} />
        <Box display="flex" mb={5} gap={2} justifyContent="center">
          <Button
            colorScheme="yellow"
            variant="outline"
            w={150}
            onClick={() => setShowFlashCardForm(!showFlashCardForm)}
          >
            Create new Flash
          </Button>
          <Button colorScheme="yellow" w={150} variant="outline">
            Create new Set
          </Button>
        </Box>
        {showFlashCardForm && (
          <Form
            schema={createFlashCardSchema}
            initialValues={{ answer: '', question: '' }}
            submitText="Create"
            onSubmit={handleCreateFlashCardMutation}
          >
            <LabeledTextField name="question" label="Question" />
            <LabeledTextField name="answer" label="Answer" />
          </Form>
        )}
      </Box>
    </Center>
  );
};

export default Home;
