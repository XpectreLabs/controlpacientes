'use client';

import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import styles from './patients.module.css';
import AddNewPatientModal from '@/components/organisms/AddNewPatientModal';
import EditPatientModal from '@/components/organisms/EditPatientModal';
import useGetPatientList from '@/hooks/useGetPatientList';
import { useGetUserSessionContext } from '@/context';
import { deletePatient, getPatientsList } from '@/api';
import Navbar from '@/components/molecules/Navbar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


export default function Patients() {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isEditPatientModalOpen, setIsEditPatientModalOpen] = useState(false);
  const { userSession } = useGetUserSessionContext();

  const { patients, setPatients } = useGetPatientList(userSession.user_id);
  const [patientToEdit, setPatientToEdit] = useState({});

  const onSetPatients = () => {
    getPatientsList(userSession.user_id).then((patientsList) => {
      setPatients(patientsList);
    });
  };

  const onDeletePatient = (patientId, name) => {
    toast
      .promise(deletePatient(patientId), {
        pending: 'Loading',
        success: `user: ${name} deleted👌`,
        error: 'Error deleting user 🤯',
      })
      .then(() => {
        onSetPatients();
      });
  };

  const columns = [
    {
      field: 'ssn',
      headerName: 'SSN',
      flex: 1.3,
    },
    {
      field: 'firstName',
      headerName: 'First name',
      flex: 1.2,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      flex: 1.2,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      type: 'tel',
      flex: 1.2,
    },
    {
      field: 'email',
      headerName: 'Email',
      sortable: false,
      flex: 2,
    },
    {
      field: 'edit',
      headerName: '',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <CreateIcon
          onClick={() => {
            setPatientToEdit(params.row);
            setIsEditPatientModalOpen(true);
          }}
        />
      ),
    },
    {
      field: 'delete',
      headerName: '',
      sortable: false,
      flex: 0.4,
      renderCell: (params) => (
        <DeleteIcon
          onClick={() => {
            onDeletePatient(params.row.patient_id, params.row.firstName);
          }}
        />
      ),
    },
  ];

  return (
    <main
      className={styles.main}
      style={{
        opacity: isAddPatientModalOpen || isEditPatientModalOpen ? 0.2 : 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Item className={styles.DeleteBorder}>
            <figure className={styles.Logo}>
              <img src="https://assets.website-files.com/640e73434d6821d825eadf94/640e8406f661a7392010e264_Vectors-Wrapper.svg"alt="" />
            </figure>

            <Navbar activeMain="0" />
          </Item>
        </Grid>
        <Grid item xs={10}>
          <Item className={styles.DeleteBorder}>
            <h1 className={styles.title}> Patients</h1>

            <Grid container spacing={2}>
              <Grid item xs={9}></Grid>
              <Grid item xs={3} align="right">
                <Button
                  variant="outlined"
                  className={styles.addPatientButton}
                  onClick={() => {
                    setIsAddPatientModalOpen(true);
                  }}
                >
                  <span>+</span> Add a New Patient
                </Button>
              </Grid>
            </Grid>

            <DataGrid
              rows={patients.map((patient) => ({
                id: patient.patient_id,
                patient_id: patient.patient_id,
                firstName: patient.firstname,
                lastName: patient.lastname,
                phone: patient.phone,
                email: patient.email,
                ssn: patient.ssn,
              }))}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableRowSelectionOnClick
            />
            <AddNewPatientModal
              isOpen={isAddPatientModalOpen}
              onClose={() => {
                setIsAddPatientModalOpen(false);
                onSetPatients();
              }}
            />
            <EditPatientModal
              patientData={patientToEdit}
              isOpen={isEditPatientModalOpen}
              onClose={() => {
                setIsEditPatientModalOpen(false);
                setPatientToEdit({});
                onSetPatients();
              }}
            />
          </Item>
        </Grid>
      </Grid>
    </main>
  );
}
