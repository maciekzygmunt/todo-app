import classes from './Header.module.css';
import { Login } from 'tabler-icons-react';
import LoginModal from '../components/LoginModal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from 'tabler-icons-react';
import { loginActions } from '../store/login-slice';
import styled from 'styled-components';
import AvatarMenu from '../components/AvatarMenu';

function Header() {
  const [opened, setOpened] = useState(false);
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();

  const loginHandler = () => {
    setOpened(true);
  };

  const logoutHandler = () => {
    dispatch(loginActions.logout());
  };

  return (
    <>
      <LoginModal opened={opened} setOpened={setOpened} />
      <div className={classes.mainHeader}>
        <p>TODO</p>
        {!isLogin && (
          <Login
            onClick={loginHandler}
            className={classes.loginIcon}
            size={36}
            strokeWidth={2}
            color={'white'}
          />
        )}
        {isLogin && (
          <IconsWrapper>
            <AvatarWrapper>
              <AvatarMenu />
            </AvatarWrapper>
            <Logout
              className={classes.loginIcon}
              onClick={logoutHandler}
              size={36}
              strokeWidth={2}
              color={'white'}
            />
          </IconsWrapper>
        )}
      </div>
    </>
  );
}

const IconsWrapper = styled.div`
  display: flex;
  column-gap: 0.8rem;
`;

const AvatarWrapper = styled.div`
  transition: transform 150ms ease-out;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;
export default Header;
