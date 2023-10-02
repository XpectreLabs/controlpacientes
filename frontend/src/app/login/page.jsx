'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import styles from './login.module.css';
import { login } from '@/api';
import { useGetUserSessionContext } from '@/context';

export default function Login() {
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
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Login</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="username"
          required
          id="outlined-required"
          label="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
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
        />
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </form>
    </main>
  );
}
