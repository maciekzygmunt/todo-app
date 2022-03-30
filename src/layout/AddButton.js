import styled from 'styled-components';
import { Plus } from 'tabler-icons-react';
import Modal from '../components/Modal';
import { useState } from 'react';

function AddButton() {
  const [opened, setOpened] = useState(false);

  const modalToggle = () => {
    setOpened((state) => !state);
  };
  return (
    <>
      <Modal opened={opened} setOpened={setOpened} />
      <Button onClick={modalToggle}>
        <Plus size={48} strokeWidth={2} color={'white'} />
      </Button>
    </>
  );
}

const Button = styled.button`
  background: #339af0;
  border: none;
  height: 4rem;
  width: 4rem;
  border-radius: 9999px;
  cursor: pointer;
  transition: all 150ms ease-out;
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  &:hover,
  &:active {
    transform: scale(1.1);
  }
`;

export default AddButton;
