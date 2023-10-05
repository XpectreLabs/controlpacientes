import { getPatientsList } from '@/api';
import { useEffect, useState } from 'react';

export default function useGetPatientList(userId) {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    getPatientsList(userId).then((patientsList) => {
      setPatients(patientsList);
    });
  }, [userId]);

  return { patients, setPatients };
}
