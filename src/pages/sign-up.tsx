import { Box, Button, Center, useToast } from '@chakra-ui/react';
import { NextPage } from 'next';
import Link from 'next/link';
import { z } from 'zod';
import { Form } from '../components/Form';
import LabeledTextField from '../components/LabeledTextField';
import { normalizeError } from '../lib/noramlized-error';
import { trpc } from '../lib/trpc';
import { signUpSchema } from '../validators/signUp';

const SignUp: NextPage = () => {
  const toast = useToast();

  const signUpMutation = trpc.useMutation(['user.signUp']);
  const handleSignUp = async (input: z.infer<typeof signUpSchema>) => {
    try {
      await signUpMutation.mutateAsync(input);
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
        <Form
          schema={signUpSchema}
          initialValues={{ email: '', name: '', password: '' }}
          submitText="Sign up"
          onSubmit={handleSignUp}
        >
          <LabeledTextField name="name" type="text" label="Name" />
          <LabeledTextField name="email" type="email" label="Email" />
          <LabeledTextField name="password" type="password" label="Password" />
        </Form>
        <Button variant="link">
          <Link href="/">Back</Link>
        </Button>
      </Box>
    </Center>
  );
};

export default SignUp;
