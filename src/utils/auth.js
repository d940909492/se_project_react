const baseUrl = "http://localhost:3001";

function checkResponse(res, message) {
  return res.ok ? res.json() : Promise.reject(`${message}: ${res.status}`);
}

export function signup({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then((res) => checkResponse(res, "Signup error"));
}

export function signin({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res, "Signin error"));
}

export function checkSession() {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    credentials: "include",
  }).then((res) => checkResponse(res, "Session check error"));
}

export function signout() {
  return fetch(`${baseUrl}/signout`, {
    method: "POST",
    credentials: "include",
  }).then((res) => checkResponse(res, "Signout error"));
}
