import classes from './Header.module.css';
import { Avatar } from '@mantine/core';
import { Login } from 'tabler-icons-react';

function Header() {
  return (
    <div className={classes.mainHeader}>
      <p>TODO</p>
      <Login className={classes.loginIcon} size={36} strokeWidth={2} color={'white'} />
    </div>
  );
}
export default Header;
