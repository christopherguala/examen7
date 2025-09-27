<script setup>
import { Auth } from "@/services/auth.js";
import { nextTick, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../store/user.js";

const router = useRouter();
const userStore = useUserStore();

const emit = defineEmits(["submitted"]);
const isLoginMode = ref(true);
const loginError = ref("");
const loading = ref(false);

const emailError = ref("");
const pswrdError = ref("");

const form = reactive({
  name: "",
  email: "",
  password: "",
});

// ---- VALIDACIONES ----
function validateEmail() {
  const v = (form.email || "").trim().toLowerCase();
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!v) return (emailError.value = "El email es obligatorio"), false;
  if (!re.test(v))
    return (emailError.value = "Formato de email inválido"), false;
  emailError.value = "";
  return true;
}

function validatePassword() {
  const v = form.password || "";
  if (!v) return (pswrdError.value = "La contraseña es obligatoria"), false;
  if (v.length < 8) return (pswrdError.value = "Mínimo 8 caracteres"), false;
  if (!/[A-Za-z]/.test(v) || !/\d/.test(v))
    return (pswrdError.value = "Debe incluir letras y números"), false;
  if (/\s/.test(v)) return (pswrdError.value = "Sin espacios"), false;
  pswrdError.value = "";
  return true;
}

function validateAll() {
  return validateEmail() && validatePassword();
}

async function handleSubmit() {
  if (!validateAll()) {
    loading.value = false;
    return;
  }
  loading.value = true;
  loginError.value = "";
  try {
    let userData;
    if (isLoginMode.value) {
      userData = await Auth.login({
        email: form.email,
        password: form.password,
      });
    } else {
      userData = await Auth.register({
        name: form.name,
        email: form.email,
        password: form.password,
      });
    }
    userStore.login(userData);
    nextTick(() => {
      router.push("/home");
    });
  } catch (err) {
    loginError.value = err.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <div class="login-header">
        <h1 class="login-title">
          {{ isLoginMode ? "Iniciar Sesión" : "Registrarse" }}
        </h1>
      </div>

      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <div v-if="!isLoginMode" class="form-group">
            <label for="name" class="form-label">Nombre</label>
            <input
              v-model="form.name"
              id="name"
              class="form-input"
              type="text"
              required
            />
          </div>

          <div class="form-group">
            <label for="email" class="form-label">Email</label>
            <input
              type="email"
              id="email"
              v-model="form.email"
              class="form-input"
              @input="validateEmail"
              required
            />
            <p v-if="emailError" class="text-red-600 mt-2">{{ emailError }}</p>
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">Contraseña</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-input"
            placeholder="Tu contraseña"
            @input="validatePassword"
            required
          />
          <p v-if="pswrdError" class="text-red-600 mt-2">{{ pswrdError }}</p>
        </div>

        <button type="submit" class="login-btn" :disabled="loading">
          {{
            loading ? "Procesando..." : isLoginMode ? "Ingresar" : "Registrarse"
          }}
        </button>
      </form>

      <div class="login-footer">
        <p v-if="loginError" class="text-red-600 mt-2">{{ loginError }}</p>

        <p class="text-black">
          {{ isLoginMode ? "¿No tienes cuenta?" : "¿Ya tienes cuenta?" }}
          <a href="#" @click.prevent="isLoginMode = !isLoginMode">
            {{ isLoginMode ? "Regístrate aquí" : "Inicia sesión" }}
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  min-height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.login-card {
  background: white;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 0.5rem 0;
}

.login-subtitle {
  color: #6b7280;
  margin: 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 500;
  color: #374151;
  font-size: 0.875rem;
}

.form-input {
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus {
  outline: none;
  border-color: #dc2626;
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
}

.login-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #dc2626;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.login-btn:hover:not(:disabled) {
  background: #b91c1c;
}

.login-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.login-footer,
p {
  color: #6b7280;
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.btn-icon {
  font-size: 1rem;
}

.login-footer {
  margin-top: 2rem;
  text-align: center;
}

.demo-info {
  font-size: 0.875rem;
  color: #6b7280;
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0;
}

@media (max-width: 480px) {
  .login-container {
    padding: 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }
}
</style>
