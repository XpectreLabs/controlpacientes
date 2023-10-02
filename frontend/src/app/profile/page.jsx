'use client';

import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import styles from './profile.module.css';
import EditProfileModal from '@/components/organisms/EditProfileModal';
import useGetUserData from '@/hooks/useGetUserData';
import { useGetUserSessionContext } from '@/context';
import Navbar from '@/components/molecules/Navbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { getUserData } from '@/api';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userSession } = useGetUserSessionContext();
  const { userData, setUserData } = useGetUserData(userSession.user_id);
  const { firstName, lastName, email, username } = userData;

  return (
    <main className={styles.main} style={{ opacity: isModalOpen ? 0.2 : 1 }}>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item className={styles.DeleteBorder}>
            <figure className={styles.Logo}>
              <img src="https://assets.website-files.com/640e73434d6821d825eadf94/640e8406f661a7392010e264_Vectors-Wrapper.svg"alt="" />
            </figure>

            <Navbar activeMain="1" />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <div className={styles.center}>
            <h1 className={styles.title}>Profile</h1>
            <List
              sx={{
                width: '100%',
                color: 'black',
              }}
              component="div"
              aria-label="mailbox folders"
            >
              <ListItem>
                <ListItemText primary="Username" secondary={username} />
              </ListItem>
              <ListItem>
                <ListItemText primary="First Name" secondary={firstName} />
              </ListItem>
              <Divider />
              <ListItem divider>
                <ListItemText primary="Last Name" secondary={lastName} />
              </ListItem>
              <Divider light />
              <ListItem>
                <ListItemText primary="email" secondary={email} />
              </ListItem>
            </List>
            <div className={styles.btns}>
              <Button
                variant="outlined"
                className={styles.addPatientButton}
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                Save
              </Button>
            </div>
            
            <EditProfileModal
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                getUserData(userData.user_id).then((data) => {
                  setUserData(data);
                });
              }}
              currentProfileData={userData}
            />
          </div>
        </Grid>
      </Grid>
    </main>
  );
}
