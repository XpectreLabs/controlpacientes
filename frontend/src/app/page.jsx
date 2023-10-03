'use client';
import React from 'react';
import { useState } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import styles from './page.module.css';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import stylesL from './login/login.module.css';
import { login } from '@/api';
import { useGetUserSessionContext } from '@/context';
import stylesS from './signup/signup.module.css';
import { createUser } from '@/api';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { setUserSession } = useGetUserSessionContext();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      toast
        .promise(login(values), {
          pending: 'Loading',
          success: `Welcome ${values.username}👌`,
          error: 'Error on login 🤯',
        })
        .then((a) => {
          router.push('/patients');
          setUserSession(a);
        });
    },
  });
  const formik2 = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      email: '',
      user: '',
    },
    onSubmit: (values) => {
      toast
        .promise(createUser(values), {
          pending: 'Loading',
          success: `user: ${values.user} created👌`,
          error: 'Error creating user 🤯',
        })
        .then(() => {
          router.push('/login');
        });
    },
  });

  return (
    <main className={styles.main}>
      <div>
        <figure className={styles.Logo}>
          <img
            src="https://assets.website-files.com/640e73434d6821d825eadf94/640e8406f661a7392010e264_Vectors-Wrapper.svg"
            alt=""
          />
        </figure>
      </div>

      <Box className={styles.Center} sx={{ width: '50%' }} align="left">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Login" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0} sx={{ width: '100%' }}>
          <main className={stylesL.main}>
            <form className={stylesL.form} onSubmit={formik.handleSubmit}>
              <TextField
                placeholder="username"
                required
                id="outlined-required"
                label="username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                size="small"
              />
              <TextField
                placeholder="Password"
                type="password"
                required
                id="outlined-required"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                size="small"
              />
              <Button
                className={stylesL.btnLogin}
                variant="outlined"
                type="submit"
              >
                Login
              </Button>
            </form>
          </main>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <main className={stylesS.main}>
            <form className={stylesS.form} onSubmit={formik2.handleSubmit}>
              <TextField
                placeholder="Username"
                required
                id="outlined-required"
                label="Username"
                name="user"
                value={formik2.values.user}
                onChange={formik2.handleChange}
                size="small"
              />
              <TextField
                placeholder="First Name"
                required
                id="outlined-required"
                label="First Name"
                name="firstName"
                value={formik2.values.firstName}
                onChange={formik2.handleChange}
                size="small"
              />
              <TextField
                placeholder="Last Name"
                required
                id="outlined-required"
                label="Last Name"
                name="lastName"
                value={formik2.values.lastName}
                onChange={formik2.handleChange}
                size="small"
              />
              <TextField
                placeholder="Email"
                required
                id="outlined-required"
                label="Email"
                name="email"
                value={formik2.values.email}
                onChange={formik2.handleChange}
                size="small"
              />
              <TextField
                placeholder="Password"
                type="Password"
                required
                id="outlined-required"
                label="Password"
                name="password"
                value={formik2.values.password}
                onChange={formik2.handleChange}
                size="small"
              />
              <Button
                className={stylesS.btnSign}
                variant="outlined"
                type="submit"
              >
                Sign Up
              </Button>
            </form>
          </main>
        </CustomTabPanel>
      </Box>
    </main>
  );
}
