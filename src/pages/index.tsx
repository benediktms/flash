import { trpc } from '@/lib/trpc';
import { Box, Text, Button, Center, Heading, useToast } from '@chakra-ui/react';
import type { NextPage } from 'next';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { z } from 'zod';
import { Form } from '../components/Form';
import LabeledTextField from '../components/LabeledTextField';
import { normalizeError } from '../lib/noramlized-error';
import { createFlashCardSchema } from '../validators/createFlashCard';

const Home: NextPage = () => {
  const [showFlashCardForm, setShowFlashCardForm] = useState(false);
  const toast = useToast();
  const { data: session } = useSession();

  const context = trpc.useContext();

  const createFlashCardMutation = trpc.useMutation(['auth.flashCard.create'], {
    async onSuccess() {
      await context.invalidateQueries(['auth.flashCard.all']);
    },
  });

  const handleCreateFlashCardMutation = async (
    input: z.infer<typeof createFlashCardSchema>
  ) => {
    try {
      await createFlashCardMutation.mutateAsync(input);
    } catch (e) {
      const err = normalizeError(e);
      toast({
        status: 'error',
        title: 'Something went wrong',
        description: err.message,
      });
    }
  };

  return (
    <Center>
      <Box>
        <Heading as="h1" my={3}>
          Achieve your goals in a flash.
        </Heading>

        {session && <Button onClick={() => signOut()}>Sign out</Button>}
        {!session && (
          <>
            <Button variant="link">
              <Link href="/sign-up">Sign up</Link>
            </Button>
            <Button onClick={() => signIn()}>Sign in</Button>
          </>
        )}
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

export async function getServerSideProps() {
  return {
    props: {},
  };
}
