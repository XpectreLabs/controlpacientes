import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import styles from './EditProfile.module.css';
import Modal from '@/components/atoms/Modal';
import { editUser, getUserData } from '@/api';

export default function EditProfileModal({
  isOpen,
  onClose,
  currentProfileData,
}) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...currentProfileData,
    },
    onSubmit: (values) => {
      toast
        .promise(editUser({ ...values, user: values.username }), {
          pending: 'Loading',
          success: `user: ${values.username} edited👌`,
          error: `Error editing user: ${values.username} 🤯`,
        })
        .then(() => {
          onClose();
        });
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="Username"
          required
          id="outlined-required"
          label="Username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <TextField
          placeholder="First "
          required
          id="outlined-required"
          label="First "
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
          placeholder="email"
          required
          id="outlined-required"
          label="Email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <Button variant="outlined" type="submit">
          Edit Profile
        </Button>
      </form>
    </Modal>
  );
}
