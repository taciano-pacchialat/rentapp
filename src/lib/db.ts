import { BASE_URL } from "@/config/config";
import { Apartment } from "@/types/apartment";
import { User } from "@/types/user";
import axios from "axios";
import Cookies from "js-cookie";
import Cache from "./cache";

export type ApartmentResponse = {
  success: boolean;
  data?: unknown;
  errors?: { [key: string]: string };
  message?: string;
};

export type UserResponse = {
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

export const getApartmentOwner = async (apartmentId: number): Promise<UserResponse> => {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const apartment = await Cache.getInstance().getById(apartmentId);
    if (!apartment) {
      throw new Error(`Apartment with ID ${apartmentId} not found.`);
    }

    const ownerId = apartment?.owner;
    const ownerResponse = await axios.get<User>(`${BASE_URL}/api/auth/users/${ownerId}/`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    return {
      success: true,
      data: ownerResponse.data,
    };
  } catch (error) {
    return {
      success: false,
      errors: { error: error instanceof Error ? error.message : String(error) },
    };
  }
};

export async function fetchUserByEmail(email: string): Promise<UserResponse> {
  try {
    const token = Cookies.get("token");
    if (!token) {
      throw new Error("Authentication token not found.");
    }

    const response = await axios.get<User[]>(`${BASE_URL}/api/auth/users/`, {
      params: { email },
      headers: {
        Authorization: `Token ${token}`,
      },
    });

    if (response.data && response.data.length > 0) {
      const user = response.data[0];
      return {
        success: true,
        data: user,
        message: "Usuario obtenido correctamente.",
      };
    } else {
      return {
        success: false,
        message: `Usuario con email ${email} no encontrado.`,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return {
        success: false,
        errors: error.response.data.errors || {},
        message: error.response.data.message || "Error al obtener el usuario.",
      };
    } else {
      return {
        success: false,
        message: "Ocurrió un error inesperado al obtener el usuario.",
      };
    }
  }
}
