import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useRouter } from 'next/navigation';
import { useGetUserSessionContext } from '@/context';
import GroupsIcon from '@mui/icons-material/Groups';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Person2Icon from '@mui/icons-material/Person2';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ContentPaste from '@mui/icons-material/ContentPaste';

export default function Navbar({activeMain}) {
  const router = useRouter();
  const { userSession, setUserSession } = useGetUserSessionContext();
  const [active, setActive] = useState(parseInt(activeMain));
  return (
          <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList  className={styles.ListNav}>
              <MenuItem className={active===0?"activo":null}>
                <ListItemIcon>
                  <GroupsIcon fontSize="small" />
                </ListItemIcon>
                <Link href="/patients" onClick={()=>{setActive(0)}}>Patients</Link>
              </MenuItem>
              <MenuItem className={active===1?"activo":null}>
                <ListItemIcon>
                  <Person2Icon fontSize="small" />
                </ListItemIcon>
                <Link href="/profile" onClick={()=>{setActive(1)}}> Profile</Link>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <PowerSettingsNewIcon fontSize="small" />
                </ListItemIcon>
               <div
                  role="button"
                  onClick={() => {
                    router.push('/');
                    setTimeout(() => {
                      setUserSession(null);
                    }, 1000);
                  }}
                >
                  Log out
                </div>
              </MenuItem>
            </MenuList>
          </Paper>

    // <nav className={styles.main}>
    //   <Link href="/profile"> Profile</Link>
    //   <Link href="/patients">Patients</Link>
    //   <div
    //     role="button"
    //     onClick={() => {
    //       router.push('/login');
    //       setTimeout(() => {
    //         setUserSession(null);
    //       }, 1000);
    //     }}
    //   >
    //     log out
    //   </div>
    // </nav>
  );
}
