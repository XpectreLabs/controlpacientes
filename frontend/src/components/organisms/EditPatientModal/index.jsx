import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import styles from './EditPatientModal.module.css';
import Modal from '@/components/atoms/Modal';
import { editPatient } from '@/api';

export default function EditPatientModal({ isOpen, onClose, patientData }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: patientData,
    onSubmit: (values) => {
      toast
        .promise(editPatient(values), {
          pending: 'Loading',
          success: `Patient: ${values.firstName} edited👌`,
          error: 'Error editing patient 🤯',
        })
        .then(() => {
          onClose();
        });
    },
  });
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Patient">
      <form className={styles.formi} onSubmit={formik.handleSubmit}>
        <TextField
          placeholder="SSN"
          required
          id="outlined-required"
          name="ssn"
          value={formik.values.ssn}
          onChange={formik.handleChange}
          size="small"
        />
        <TextField
          placeholder="First Name"
          required
          id="outlined-required"
          name="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          size="small"
        />
        <TextField
          placeholder="Last Name"
          required
          id="outlined-required"
          name="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          size="small"
        />
        <TextField
          placeholder="Phone"
          required
          id="outlined-required"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          size="small"
        />
        <TextField
          placeholder="Email"
          required
          id="outlined-required"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          size="small"
        />

        <div className={styles.btns}>
            <Button className={styles.btn} variant="outlined" type="submit">
              Save
            </Button>
        </div>
      </form>
    </Modal>
  );
}
