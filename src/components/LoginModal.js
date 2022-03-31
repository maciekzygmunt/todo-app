import { useState } from 'react';
import { Modal, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { loginActions } from '../store/login-slice';

function LoginModal({ opened, setOpened }) {
  const [loginPage, setLoginPage] = useState(true);
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? "Password can't be smaller than 6" : null),
    },
  });

  const submitHandler = async (values) => {
    if (!loginPage) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATK6sV1GksGV2zjtduEAXB4FB5yA2JlOE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      setLoginPage(true);
    }
    if (loginPage) {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyATK6sV1GksGV2zjtduEAXB4FB5yA2JlOE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            returnSecureToken: true,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        dispatch(loginActions.login());
        dispatch(loginActions.setEmail(values.email.split('.').join('')));
        setOpened(false);
      }
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={`${loginPage ? 'Login' : 'Sign Up'}`}
      >
        <form
          onSubmit={form.onSubmit((values) => {
            submitHandler(values);
          })}
        >
          <TextInput
            label="Email"
            type="text"
            required
            placeholder="Your email"
            {...form.getInputProps('email')}
          />
          <TextInput
            label="Password"
            type="password"
            required
            placeholder="Your password"
            {...form.getInputProps('password')}
          />
          <Group position="right" mt="md">
            <Button type="submit">{loginPage ? 'Login' : 'Sign Up'}</Button>
          </Group>
        </form>
        <Paragraph>
          {loginPage ? "Don't have an account yet? " : 'Already have an account? '}
          <Link
            onClick={() => {
              setLoginPage((state) => !state);
            }}
          >
            {loginPage ? 'Sign Up' : 'Login'}
          </Link>
        </Paragraph>
      </Modal>
    </>
  );
}

const Paragraph = styled.div`
  display: inline;
`;
const Link = styled.p`
  display: inline;
  color: #339af0;
  cursor: pointer;
  &:hover {
    color: #1974bf;
  }
`;

export default LoginModal;
