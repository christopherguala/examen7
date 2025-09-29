const USERS_KEY = "users_DLH";
const CURRENT_USER_KEY = "current_user_DLH";

function seedIfEmpty() {
  if (!localStorage.getItem(USERS_KEY)) {
    const seed = [
      {
        id: 1,
        email: "usuario1@mitienda.com",
        password: "password1",
        name: "Usuario Demo",
        role: "user",
        createdAt: new Date().toISOString(),
        isActive: true
      },
      {
        id: 2,
        email: "admin@dandolahora.com",
        password: "admin123",
        name: "Administrador",
        role: "admin",
        createdAt: new Date().toISOString(),
        isActive: true
      }
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

function getCurrentUser() {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(email);
}

function validatePassword(password) {
  return password && password.length >= 6;
}

export const Auth = {
  login({ email, password }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validaciones
        if (!validateEmail(email)) {
          return reject(new Error("Formato de email inválido"));
        }
        if (!validatePassword(password)) {
          return reject(new Error("La contraseña debe tener al menos 6 caracteres"));
        }

        const users = readUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && 
                u.password === password && 
                u.isActive
        );
        
        if (user) {
          const { password: _p, ...safe } = user;
          safe.token = "fake-jwt-" + user.id + "-" + Date.now();
          safe.lastLogin = new Date().toISOString();
          
          // Guardar usuario actual
          setCurrentUser(safe);
          
          // Actualizar último login en la base de datos
          const updatedUsers = users.map(u => 
            u.id === user.id ? { ...u, lastLogin: safe.lastLogin } : u
          );
          writeUsers(updatedUsers);
          
          resolve(safe);
        } else {
          reject(new Error("Email o contraseña incorrectos"));
        }
      }, 800);
    });
  },

  register({ email, password, name }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validaciones
        if (!name || name.trim().length < 2) {
          return reject(new Error("El nombre debe tener al menos 2 caracteres"));
        }
        if (!validateEmail(email)) {
          return reject(new Error("Formato de email inválido"));
        }
        if (!validatePassword(password)) {
          return reject(new Error("La contraseña debe tener al menos 6 caracteres"));
        }

        const users = readUsers();
        if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
          return reject(new Error("Este email ya se encuentra registrado"));
        }

        const id = (users.at(-1)?.id || 0) + 1;
        const newUser = { 
          id, 
          email: email.toLowerCase(), 
          password, 
          name: name.trim(),
          role: "user",
          createdAt: new Date().toISOString(),
          isActive: true
        };
        
        users.push(newUser);
        writeUsers(users);
        
        const { password: _p, ...safe } = newUser;
        safe.token = "fake-jwt-" + newUser.id + "-" + Date.now();
        safe.lastLogin = new Date().toISOString();
        
        // Guardar usuario actual
        setCurrentUser(safe);
        
        resolve(safe);
      }, 1000);
    });
  },

  logout() {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve();
      }, 300);
    });
  },

  getCurrentUser() {
    return getCurrentUser();
  },

  isAuthenticated() {
    return getCurrentUser() !== null;
  },

  updateProfile({ name, email }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = getCurrentUser();
        if (!currentUser) {
          return reject(new Error("Usuario no autenticado"));
        }

        const users = readUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex === -1) {
          return reject(new Error("Usuario no encontrado"));
        }

        // Validar email si cambió
        if (email !== currentUser.email) {
          if (!validateEmail(email)) {
            return reject(new Error("Formato de email inválido"));
          }
          if (users.some((u, index) => index !== userIndex && u.email.toLowerCase() === email.toLowerCase())) {
            return reject(new Error("Este email ya está en uso"));
          }
        }

        // Actualizar usuario
        users[userIndex] = {
          ...users[userIndex],
          name: name.trim(),
          email: email.toLowerCase(),
          updatedAt: new Date().toISOString()
        };
        
        writeUsers(users);
        
        // Actualizar usuario actual
        const updatedUser = {
          ...currentUser,
          name: users[userIndex].name,
          email: users[userIndex].email,
          updatedAt: users[userIndex].updatedAt
        };
        
        setCurrentUser(updatedUser);
        resolve(updatedUser);
      }, 800);
    });
  },

  _listUsers() {
    return readUsers();
  },
};
