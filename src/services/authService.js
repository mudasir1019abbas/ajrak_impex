import { api } from "./api.js";

// Expected backend contract (adjust to match your Express routes):
//   POST /api/auth/register  { name, email, password }  -> { token, user }
//   POST /api/auth/login     { email, password }        -> { token, user }
//   GET  /api/auth/me        (Bearer token)             -> { user }
//   POST /api/contact        { name, email, subject, message } -> { message }
export const authService = {
  register: (payload) => api("/auth/register", { method: "POST", body: payload }),
  login: (payload) => api("/auth/login", { method: "POST", body: payload }),
  me: () => api("/auth/me"),
};

export const contactService = {
  send: (payload) => api("/contact", { method: "POST", body: payload }),
};
