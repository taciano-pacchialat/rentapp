import axios from "axios";

const base_url = "http://localhost:8000";

export type AuthResponse = {
  success: boolean;
  data?: unknown;
  errors?: { [key: string]: string };
  message?: string;
};

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  password2: string;
  dni: string;
}): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${base_url}/api/auth/register/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = response.data.token;
    localStorage.setItem("token", token);

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al registrarse.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado.",
      };
    }
  }
}

export async function loginUser(data: {
  username: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const response = await axios.post(`${base_url}/api/auth/login/`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const token = response.data.token;
    localStorage.setItem("token", token);

    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        message: error.response.data.message || "Error, credenciales inválidas.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado.",
      };
    }
  }
}
