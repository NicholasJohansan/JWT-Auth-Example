
const baseUrl = '/api/auth';

export const login = async (username, password) => {
  const res = await fetch(`${baseUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    return await res.json();
  } else {
    return (await res.json()).error;
  }
};

export const register = async (username, password) => {
  const res = await fetch(`${baseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });
  if (res.ok) {
    return await res.json();
  } else {
    return (await res.json()).error;
  }
};

export const getInfo = async () => {
  const res = await fetch(`${baseUrl}/info`);
  if (res.ok) {
    return await res.json();
  } else {
    return (await res.json()).error;
  }
};

export const logout = async () => {
  const res = await fetch(`${baseUrl}/logout`, {
    method: 'POST'
  });
  if (res.ok) {
    return await res.json();
  } else {
    return (await res.json()).error;
  }
};

export const deleteAccount = async () => {
  const res = await fetch(`${baseUrl}/delete`, {
    method: 'DELETE'
  });
  if (res.ok) {
    return await res.json();
  } else {
    return (await res.json()).error;
  }
};