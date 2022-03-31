import { Modal as ModalComp } from '@mantine/core';
import { TextInput, Button, Group } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../store/todo-slice';

function Modal({ opened, setOpened }) {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.login.isLogin);
  const email = useSelector((state) => state.login.email);

  const form = useForm({
    initialValues: {
      todo: '',
    },

    validate: {
      todo: (value) => (value.length === 0 ? "Text can't be empty" : null),
    },
  });

  const onAddHandler = (values) => {
    dispatch(
      todoActions.addTodo({
        todo: { id: Date.now(), title: values.todo, isChecked: false, fbkey: Date.now() },
        isLogin,
        email,
      })
    );
    setOpened(false);
  };

  return (
    <>
      <ModalComp opened={opened} onClose={() => setOpened(false)} title="Add new TODO">
        <form onSubmit={form.onSubmit((values) => onAddHandler(values))}>
          <TextInput label="TODO" placeholder="TODO text" {...form.getInputProps('todo')} />
          <Group position="right" mt="md">
            <Button type="submit">Add</Button>
          </Group>
        </form>
      </ModalComp>
    </>
  );
}
export default Modal;
