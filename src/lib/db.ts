import { BASE_URL } from "@/config/config";
import axios from "axios";

export type ApartmentResponse = {
  success: boolean;
  data?: unknown;
  errors?: { [key: string]: string };
  message?: string;
};

export async function fetchApartments(): Promise<ApartmentResponse> {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get(BASE_URL + "/api/apartments/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al obtener los departamentos.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado.",
      };
    }
  }
}
