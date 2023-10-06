const URLPATH = 'http://localhost:3001';

export const createUser = async (userData) => {
  const res = await fetch(`${URLPATH}/api/v1/users/`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  console.log(data)

  return data;
};

export const login = async (userData) => {
  const res = await fetch(`${URLPATH}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  if (data.auth === 'Incorrect access data') {
    throw Error('data.userSession.auth');
  }

  return data;
};

export const createPatient = async (patientData,token) => {
  const res = await fetch(`${URLPATH}/api/v1/patients`, {
    method: 'POST',
    body: JSON.stringify(patientData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();
  console.log(data);
  return data;
};

export const getPatientsList = async (userId,token) => {
  const res = await fetch(`${URLPATH}/api/v1/patients/${userId}/patients`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();

  return data.listPatients;
};

export const editPatient = async (patientData,token) => {
  const res = await fetch(`${URLPATH}/api/v1/patients/`, {
    method: 'PUT',
    body: JSON.stringify(patientData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();

  return data.listPatients;
};

export const deletePatient = async (patientId,token) => {
  const res = await fetch(`${URLPATH}/api/v1/patients`, {
    method: 'DELETE',
    body: JSON.stringify({ patient_id: patientId }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();

  return data;
};

export const getUserData = async (userId,token) => {
  const res = await fetch(`${URLPATH}/api/v1/users/${userId}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();
  const { user_id, username, firstname, lastname, password, email } =
    data.dataUser[0];
  return {
    user_id,
    username,
    firstName: firstname,
    lastName: lastname,
    password,
    email,
  };
};

export const editUser = async (userData,token) => {
  const res = await fetch(`${URLPATH}/api/v1/users/`, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
  const data = await res.json();
  console.log(data);
  return data.listPatients;
};
