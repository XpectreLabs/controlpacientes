'use client';

import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';
import { createUser } from '@/api';

export default function Home() {
  const router = useRouter();

  const formik = useFormik({
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
      <h1 className={styles.title}>Sign Up</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="Username"
          required
          id="outlined-required"
          label="Username"
          name="user"
          value={formik.values.user}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="First Name"
          required
          id="outlined-required"
          label="First Name"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Last Name"
          required
          id="outlined-required"
          label="Last Name"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Email"
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="Password"
          type="Password"
          required
          id="outlined-required"
          label="Password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button variant="outlined" type="submit">
          Sign Up
        </Button>
      </form>
    </main>
  );
}
