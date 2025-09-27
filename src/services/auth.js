const USERS_KEY = "users_DLH";

function seedIfEmpty() {
  if (!localStorage.getItem(USERS_KEY)) {
    const seed = [
      {
        id: 1,
        email: "usuario1@mitienda.com",
        password: "password1",
        name: "Usuario Demo",
      },
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(seed));
  }
}

function readUsers() {
  seedIfEmpty();
  return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const Auth = {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = readUsers();
        const user = users.find(
          (u) => u.email === email && u.password === password
        );
        if (user) {
          const { password: _p, ...safe } = user;
          safe.token = "fake-jwt-" + user.id + "-" + Date.now();
          resolve(safe);
        }
        reject(new Error("Credenciales inválidas"));
      }, 600);
    });
  },

  register({ email, password, name }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = readUsers();
        if (users.some((u) => u.email === email)) {
          return reject(new Error("Este email ya se encuentra registrado."));
        }
        const id = (users.at(-1)?.id || 0) + 1;
        const newUser = { id, email, password, name };
        users.push(newUser);
        writeUsers(users);
        const { password: _p, ...safe } = newUser;
        safe.token = "fake-jwt-" + newUser.id + "-" + Date.now();
        resolve(safe);
      }, 600);
    });
  },

  logout() {
    return new Promise((resolve) => setTimeout(() => resolve(), 200));
  },

  _listUsers() {
    return readUsers();
  },
};
