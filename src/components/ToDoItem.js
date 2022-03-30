import styled from 'styled-components';
import { Checkbox } from '@mantine/core';
import { TrashX } from 'tabler-icons-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { todoActions } from '../store/todo-slice';

function ToDoItem({ id, title, isChecked }) {
  const dispatch = useDispatch();
  const [checkBoxIsChecked, setCheckBoxIsChecked] = useState(isChecked);

  const removeToDoHandler = () => {
    console.log(id);

    dispatch(todoActions.removeTodo(id));
  };

  return (
    <Wrapper>
      <Checkbox
        checked={checkBoxIsChecked}
        onChange={(event) => setCheckBoxIsChecked(event.currentTarget.checked)}
      />
      <Title isChecked={checkBoxIsChecked}>{title}</Title>
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
  text-decoration: ${(props) => (props.isChecked ? 'line-through' : 'none')};
`;

const Icon = styled.div`
  cursor: pointer;
  transition: transform 150ms ease-out;
  &:hover {
    transform: scale(1.1);
  }
`;
