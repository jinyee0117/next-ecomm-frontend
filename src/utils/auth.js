import { PUBLIC_BASE_URL } from '$env/static/public';
import { writable } from 'svelte/store';


export const loggedIn = writable(false);

const emptyAuth = {
  "token": "",
  "userId": ""
}

export function logOut() {
  localStorage.setItem("auth", JSON.stringify(emptyAuth));
  loggedIn.set(false)
  return true
}

// ignore this first, in case for future use
export function getUserId() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["userId"]
  }
  return null
}

export function getTokenFromLocalStorage() {
  const auth = localStorage.getItem("auth")
  if (auth) {
    return JSON.parse(auth)["token"]
  }
  return null
}

export async function isLoggedIn() {
  if (!getTokenFromLocalStorage()) {
      loggedIn.set(false)
    return false
  }

  try {
    const resp = await fetch(
      PUBLIC_BASE_URL + '/auth/refresh-token',
      {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getTokenFromLocalStorage()
        },
      }
    );

    const res = await resp.json()
    if (resp.status == 200) {

      localStorage.setItem("auth", JSON.stringify({
        "token": res.accessToken,
        "userId": res.userId,
      }));
      loggedIn.set(true)
      return true
    }
    loggedIn.set(false)
    return false
  } catch {
    loggedIn.set(false)
    return false
  }
}

export async function authenticateUser(email, password) {
  const resp = await fetch(
    PUBLIC_BASE_URL + '/auth/signIn',
    {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    }
  );

  const res = await resp.json();

  if (resp.status == 200) {
    localStorage.setItem("auth", JSON.stringify({
      "token": res.accessToken,
      "userId": res.userId,
    }));
    loggedIn.set(true)
    return {
      success: true,
      res: res
    }
  }
  loggedIn.set(false)
  return {
    success: false,
    res: res
  }
}