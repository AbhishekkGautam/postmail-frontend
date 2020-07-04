import { API } from "../backend";

//signup
export const createUser = (user) => {
  return fetch(`${API}/api/users/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//list of users
export const getAllUsers = () => {
  return fetch(`${API}/api/users/`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//get a single user
export const getUser = (userId, token, signal) => {
  return fetch(`${API}/api/users/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//update user
export const updateUser = (userId, token, user) => {
  return fetch(`${API}/api/users/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

//delete user
export const deleteUser = (userId, token) => {
  return fetch(`${API}/api/users/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const follow = (userId, token, followId) => {
  return fetch(`${API}/api/users/follow/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, followId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("FOLLOW FAILED", err));
};

export const unfollow = (userId, token, unfollowId) => {
  return fetch(`${API}/api/users/unfollow/`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userId, unfollowId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const findPeople = (userId, token, signal) => {
  return fetch(`${API}/api/users/findPeople/${userId}`, {
    method: "GET",
    signal: signal,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
