// src/api/userAuth.js
import { getUsers, addUser, getLoggedUser, setLoggedUser, logoutUser } from "../storage/anyStorage";

// valida Email
function isEmailValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const userAuth = {
  signup: ({ name, email, password }) => {
    const users = getUsers();

    if (!name || name.length < 3) throw new Error("Nome inválido.");
    if (!isEmailValid(email)) throw new Error("Email inválido.");
    if (users.some((u) => u.email === email)) throw new Error("Email já cadastrado.");
    if (password.length < 6) throw new Error("Senha deve ter pelo menos 6 caracteres.");

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    addUser(newUser);
    return newUser;
  },

  login: ({ email, password }) => {
    const users = getUsers();
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) throw new Error("Credenciais inválidas.");

    setLoggedUser({ id: user.id, name: user.name, email: user.email });
    return user;
  },

  logout: () => logoutUser(),
  isLogged: () => Boolean(getLoggedUser()),
  getLogged: () => getLoggedUser(),
};
