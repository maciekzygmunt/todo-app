import styled from 'styled-components';
import { Checkbox } from '@mantine/core';
import { TrashX } from 'tabler-icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todoActions } from '../store/todo-slice';

function ToDoItem({ fbkey, title, isChecked, id }) {
  const isLogin = useSelector((state) => state.login.isLogin);
  const email = useSelector((state) => state.login.email);
  const dispatch = useDispatch();
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState(isChecked);

  const removeToDoHandler = () => {
    dispatch(todoActions.removeTodo({ fbkey, email, isLogin }));
  };

  const checkboxHandler = async (checkboxState) => {
    setCheckBoxIsChecked(checkboxState);
    const response = await fetch(
      `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/${email}/${fbkey}.json`,
      {
        method: 'PUT',
        body: JSON.stringify({
          id,
          isChecked: checkboxState,
          title,
        }),
      }
    );
  };

  return (
    <Wrapper>
      <Checkbox
        checked={checkBoxIsChecked}
        onChange={(event) => {
          checkboxHandler(event.currentTarget.checked);
        }}
      />
      <Title checkBoxIsChecked={checkBoxIsChecked}>{title}</Title>
      <Icon onClick={removeToDoHandler}>
        <TrashX size={24} strokeWidth={2} color={'black'} />
      </Icon>
    </Wrapper>
  );
}
export default ToDoItem;

const Wrapper = styled.div`
  margin: 0 0.2rem;
  margin-top: 0.2rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: inset 0px 0px 43px -14px rgba(66, 68, 90, 1);
  border-radius: 10px;
`;

const Title = styled.p`
  text-decoration: ${(props) => (props.checkBoxIsChecked ? 'line-through' : 'none')} 0.15rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 0.3rem;
`;

const Icon = styled.div`
  cursor: pointer;
  transition: transform 150ms ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
