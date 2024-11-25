import { Apartment } from "@/types/apartment";
import { fetchApartments, addApartment, updateApartment, deleteApartment } from "@/lib/db";

export class Cache {
  private static instance: Cache;
  private data: Apartment[] = [];
  private isLoaded: boolean = false;

  private constructor() {}

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
      Cache.instance.initialize();
    }
    return Cache.instance;
  }

  /**
   * Initializes the cache by fetching data from the API
   */
  private async initialize(): Promise<void> {
    if (!this.isLoaded) {
      const apartmentsResponse = await this.fetchDataFromDatabase();
      if (apartmentsResponse.success) {
        this.data = apartmentsResponse.data as Apartment[];
        this.isLoaded = true;
        console.log("Datos cargados desde la API:", this.data);
      } else {
        console.error(apartmentsResponse.message || "Error al cargar los datos.");
      }
    }
  }

  /**
   * Fetches apartments from the API using the fetchApartments function
   */
  private async fetchDataFromDatabase(): Promise<{
    success: boolean;
    data?: Apartment[];
    errors?: { [key: string]: string };
    message?: string;
  }> {
    const response = await fetchApartments();
    if (response.success && response.data) {
      return {
        success: true,
        data: response.data as Apartment[],
      };
    } else {
      return {
        success: false,
        errors: response.errors,
        message: response.message,
      };
    }
  }

  /**
   * Retrieves all apartments from the cache
   */
  public async getAll(): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data;
  }

  /**
   * Retrieves an apartment by its ID
   * @param id Apartment ID
   */
  public async getById(id: number): Promise<Apartment | undefined> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.find((item) => item.id === id);
  }

  /**
   * Filters apartments based on given criteria
   * @param criteria Partial criteria to filter apartments
   */
  public async filterBy(criteria: Partial<Apartment>): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.filter((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof Apartment] === value)
    );
  }

  /**
   * Filters apartments by rating
   * @param rating Minimum rating
   */
  public async filterByRating(rating: number): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.filter((item) => item.rating >= rating);
  }

  /**
   * Adds a new apartment via the API and updates the cache
   * @param newItem New apartment data
   */
  public async addData(newItem: Partial<Apartment>): Promise<boolean> {
    const response = await addApartment(newItem);
    if (response.success && response.data) {
      const addedApartment = response.data as Apartment;
      this.data.push(addedApartment);
      console.log("Se ha añadido un nuevo apartamento:", addedApartment);
      return true;
    } else {
      console.error(response.message || "Error al agregar el nuevo apartamento.", response.errors);
      return false;
    }
  }

  /**
   * Updates an existing apartment via the API and updates the cache
   * @param id Apartment ID to update
   * @param updatedData Partial data to update
   */
  public async updateData(id: number, updatedData: Partial<Apartment>): Promise<boolean> {
    const response = await updateApartment(id, updatedData);
    if (response.success && response.data) {
      const updatedApartment = response.data as Apartment;
      this.data = this.data.map((item) =>
        item.id === id ? { ...item, ...updatedApartment } : item
      );
      console.log("Se ha actualizado el apartamento:", updatedApartment);
      return true;
    } else {
      console.error(response.message || "Error al actualizar el apartamento.", response.errors);
      return false;
    }
  }

  /**
   * Deletes an apartment via the API and updates the cache
   * @param id Apartment ID to delete
   */
  public async removeData(id: number): Promise<boolean> {
    const response = await deleteApartment(id);
    if (response.success) {
      this.data = this.data.filter((item) => item.id !== id);
      console.log(`Apartamento con ID ${id} eliminado exitosamente.`);
      return true;
    } else {
      console.error(response.message || "Error al eliminar el apartamento.", response.errors);
      return false;
    }
  }

  /**
   * Gets the apartments owned by the owner corresponding to the ownerEmail
   * @param ownerEmail owner's email
   */
  public async getByOwner(ownerEmail: string): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.filter((item) => item.owner.email == ownerEmail);
  }
}

export default Cache;
