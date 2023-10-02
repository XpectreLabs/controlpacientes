const URLPATH = 'http://localhost:3001';

export const createUser = async (userData) => {
  const res = await fetch(`${URLPATH}/createUser`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data;
};

export const login = async (userData) => {
  const res = await fetch(`${URLPATH}/login`, {
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

export const createPatient = async (patientData) => {
  const res = await fetch(`${URLPATH}/createPatient`, {
    method: 'POST',
    body: JSON.stringify(patientData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data;
};

export const getPatientsList = async (userId) => {
  const res = await fetch(`${URLPATH}/listPatients`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data.listPatients;
};

export const editPatient = async (patientData) => {
  const res = await fetch(`${URLPATH}/editPatient`, {
    method: 'POST',
    body: JSON.stringify(patientData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data.listPatients;
};

export const deletePatient = async (patientId) => {
  const res = await fetch(`${URLPATH}/deletePatient`, {
    method: 'POST',
    body: JSON.stringify({ patient_id: patientId }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data;
};

export const getUserData = async (userId) => {
  const res = await fetch(`${URLPATH}/dataUser`, {
    method: 'POST',
    body: JSON.stringify({ user_id: userId }),
    headers: {
      'Content-Type': 'application/json',
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

export const editUser = async (userData) => {
  const res = await fetch(`${URLPATH}/editUser`, {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return data.listPatients;
};
