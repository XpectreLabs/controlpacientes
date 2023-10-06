import { useEffect, useState } from 'react';
import { getPatientsList } from '@/api';

export default function useGetPatientList(userId,token) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatientsList(userId,token).then((patientsList) => {
      setPatients(patientsList);
    });
  }, []);

  return { patients, setPatients };
}
