import { useEffect, useState } from 'react';
import { getUserData } from '@/api';

export default function useGetUserData(userId) {
  const [userData, setUserData] = useState({
    user_id: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
  });

  useEffect(() => {
    getUserData(localStorage.getItem('user_id'),localStorage.getItem('token')).then((data) => {
      setUserData(data);
    });
  }, [userId]);

  return { userData, setUserData };
}
