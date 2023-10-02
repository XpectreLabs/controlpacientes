import { useEffect, useState } from 'react';
import { getPatientsList } from '@/api';

export default function useGetPatientList(userId) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatientsList(userId).then((patientsList) => {
      setPatients(patientsList);
    });
  }, []);

  return { patients, setPatients };
}
