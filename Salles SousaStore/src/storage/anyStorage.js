// src/storage/anyStorage.js

const DELETED_KEY = "deleted_products_v1";


export function getDeletedProducts() {
  return JSON.parse(localStorage.getItem(DELETED_KEY) || "[]");
}

export function addDeletedProduct(id) {
  const list = getDeletedProducts();
  const newList = [...new Set([...list, id])];
  localStorage.setItem(DELETED_KEY, JSON.stringify(newList));
}


export function restoreProduct(id) {
  const list = getDeletedProducts().filter((x) => x !== id);
  localStorage.setItem(DELETED_KEY, JSON.stringify(list));
}

export function isDeleted(id) {
  return getDeletedProducts().includes(id);
}




const USERS_KEY = "users_db_v1";
const LOGGED_KEY = "user_logged_v1";


export function getUsers() {
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}


export function addUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function setLoggedUser(user) {
  localStorage.setItem(LOGGED_KEY, JSON.stringify(user));
}


export function getLoggedUser() {
  return JSON.parse(localStorage.getItem(LOGGED_KEY) || "null");
}


export function logoutUser() {
  localStorage.removeItem(LOGGED_KEY);
}


export function isUserLogged() {
  return Boolean(localStorage.getItem(LOGGED_KEY));
}
