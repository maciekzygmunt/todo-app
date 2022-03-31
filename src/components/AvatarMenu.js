import { Menu } from '@mantine/core';
import { Photo } from 'tabler-icons-react';
import { Avatar } from '@mantine/core';
import { useEffect, useState } from 'react';
import AvatarImageModal from './AvatarImageModal';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../store/login-slice';

function AvatarMenu() {
  const [avatarModalIsOpen, setAvatarModalIsOpen] = useState(false);
  const image = useSelector((state) => state.login.image);
  const email = useSelector((state) => state.login.image);
  const dispatch = useDispatch();

  const modalToggle = () => {
    setAvatarModalIsOpen((state) => !state);
  };

  useEffect(() => {
    const getImage = async () => {
      const response = await fetch(
        `https://to-do-app-ccb69-default-rtdb.europe-west1.firebasedatabase.app/userData/${email}.json`
      );
      const data = await response.json();
      let image;
      for (const key in data) {
        for (const m in data[key]) {
          image = data[key][m];
        }
      }
      dispatch(loginActions.setImage(image));
    };
    getImage();
  }, []);

  return (
    <>
      <AvatarImageModal opened={avatarModalIsOpen} setOpened={setAvatarModalIsOpen} />
      <Menu control={<Avatar src={image || ''} radius="xl" />}>
        <Menu.Label>User Settings</Menu.Label>
        <Menu.Item onClick={modalToggle} icon={<Photo size={14} />}>
          Change Avatar
        </Menu.Item>
      </Menu>
    </>
  );
}
export default AvatarMenu;
