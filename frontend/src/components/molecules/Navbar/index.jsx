import { useGetUserSessionContext } from '@/context';
import GroupsIcon from '@mui/icons-material/Groups';
import Person2Icon from '@mui/icons-material/Person2';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar({activeMain}) {
  const router = useRouter();
  const { userSession, setUserSession } = useGetUserSessionContext();
  const [active, setActive] = useState(parseInt(activeMain));
  return (
          <Paper sx={{ width: 320, maxWidth: '100%' }}>
            <MenuList  className={styles.ListNav}>
              <Link href="/patients" onClick={()=>{setActive(0)}}>
                <MenuItem className={active===0?"activo":null}>
                  <ListItemIcon>
                    <GroupsIcon fontSize="small" />
                  </ListItemIcon>
                  Patients
                </MenuItem>
              </Link>
              <Link href="/profile" onClick={()=>{setActive(1)}}>
                <MenuItem className={active===1?"activo":null}>
                  <ListItemIcon>
                    <Person2Icon fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
              </Link>
               <div
                  role="button"
                  onClick={() => {
                    router.push('/');
                    setTimeout(() => {
                      setUserSession(null);
                    }, 1000);
                  }}
                >
                <MenuItem>
                  <ListItemIcon>
                    <PowerSettingsNewIcon fontSize="small" />
                  </ListItemIcon>
                    Log out
                </MenuItem>
              </div>
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
