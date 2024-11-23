import { BASE_URL } from "@/config/config";
import { Apartment } from "@/types/apartment";
import axios from "axios";
import Cookies from "js-cookie";

export type ApartmentResponse = {
  success: boolean;
  data?: unknown;
  errors?: { [key: string]: string };
  message?: string;
};

export async function fetchApartments(): Promise<ApartmentResponse> {
  const token = Cookies.get("token");
  try {
    const response = await axios.get(BASE_URL + "/api/apartments/", {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return {
      success: true,
      data: response.data as Apartment[],
      message: "Departamentos fetcheados correctamente",
    };
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

export async function updateApartment(
  apartmentId: number,
  data: Partial<Apartment>
): Promise<ApartmentResponse> {
  const token = Cookies.get("token");
  try {
    const response = await axios.put(`${BASE_URL}/api/apartments/${apartmentId}/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al actualizar el departamento.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado al actualizar.",
      };
    }
  }
}

export async function deleteApartment(apartmentId: number): Promise<ApartmentResponse> {
  const token = Cookies.get("token");
  try {
    await axios.delete(`${BASE_URL}/api/apartments/${apartmentId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    return {
      success: true,
      message: "Departamento eliminado exitosamente.",
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al eliminar el departamento.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado al eliminar.",
      };
    }
  }
}

export async function addApartment(data: Partial<Apartment>): Promise<ApartmentResponse> {
  const token = Cookies.get("token");
  try {
    const response = await axios.post(`${BASE_URL}/api/apartments/`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al agregar el departamento.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado al agregar.",
      };
    }
  }
}
