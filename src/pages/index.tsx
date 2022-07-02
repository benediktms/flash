import { trpc } from '@/lib/trpc';
import {
  Box,
  Text,
  Button,
  Center,
  Heading,
  FormControl,
  Input,
  FormHelperText,
  useToast,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { useState } from 'react';

const Home: NextPage = () => {
  const [showFlashCardForm, setShowFlashCardForm] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const toast = useToast();

  const createFlashCardMutation = trpc.useMutation(['create-flashcard']);
  const handleCreateFlashCardMutation = (question: string, answer: string) => {
    createFlashCardMutation.mutate({
      question,
      answer,
    });

    if (createFlashCardMutation.error) {
      const error = JSON.parse(createFlashCardMutation.error.message);
      toast({
        title: 'Something went wrong',
        description: error[0].message,
        status: 'error',
        isClosable: true,
      });
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
          <FormControl>
            <Input
              type="text"
              id="question"
              variant="filled"
              placeholder="Question"
              value={question}
              onChange={e => {
                console.log(e.target.value);
                return setQuestion(e.target.value);
              }}
            />
            <FormHelperText>
              Enter the question you want to revise for this flash card
            </FormHelperText>
            <Box mb={5} />
            <Input
              type="text"
              id="answer"
              variant="filled"
              placeholder="Answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
            <FormHelperText>Enter the answer</FormHelperText>
            <Box mb={5} />
            <Button
              colorScheme="yellow"
              onClick={() => handleCreateFlashCardMutation(question, answer)}
              disabled={createFlashCardMutation.isLoading}
            >
              Submit
            </Button>
          </FormControl>
        )}
      </Box>
    </Center>
  );
};

export default Home;
