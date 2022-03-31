import { Modal as ModalComp } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/login-slice';

function AvatarImageModal({ opened, setOpened }) {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);

  const form = useForm({
    initialValues: {
      image: '',
    },

    validate: {
      image: (value) => (/\.(jpeg|jpg|gif|png)$/.test(value) ? null : 'Invalid link'),
    },
  });

  const submitHandler = async (values) => {
    const response = await fetch(
      `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/userData/${email}.json`,
      {
        method: 'POST',
        body: JSON.stringify(values.image),
      }
    );
    if (response.ok) {
      setOpened(false);
      dispatch(loginActions.setImage(values.image));
    }
  };

  return (
    <>
      <ModalComp opened={opened} onClose={() => setOpened(false)} title="Enter image link">
        <form onSubmit={form.onSubmit((values) => submitHandler(values))}>
          <TextInput label="Image" placeholder="YourImage.jpg" {...form.getInputProps('image')} />
          <Group position="right" mt="md">
            <Button type="submit">Add</Button>
          </Group>
        </form>
      </ModalComp>
    </>
  );
}
export default AvatarImageModal;
