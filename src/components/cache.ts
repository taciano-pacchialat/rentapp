type Apartment = {
  id: number;
  name: string;
  price: number;
  expenses: number;
  owner: string;
  description: string;
  hasParking: boolean;
  hasPets: boolean;
  hasPool: boolean;
  hasGym: boolean;
  images: string[];
  floor: number;
  letter: string;
  bathrooms: number;
  rooms: number;
  additionalInfo: string;
  rating: number;
};

class Cache {
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

  private async initialize(): Promise<void> {
    if (!this.isLoaded) {
      this.data = await this.fetchDataFromDatabase();
      this.isLoaded = true;
    }
  }

  private async fetchDataFromDatabase(): Promise<Apartment[]> {
    console.log("Cargando datos desde la base de datos simulada...");
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
  {
    id: 1,
    name: 'Luxury Loft',
    price: 1200,
    expenses: 150,
    owner: 'John Doe',
    description: 'A beautiful loft in the city center.',
    hasParking: true,
    hasPets: false,
    hasPool: true,
    hasGym: true,
    images: [],
    floor: 3,
    letter: 'A',
    bathrooms: 1,
    rooms: 1,
    additionalInfo: 'Close to public transport.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Cozy Apartment',
    price: 800,
    expenses: 100,
    owner: 'Jane Smith',
    description: 'A cozy apartment near the park.',
    hasParking: false,
    hasPets: true,
    hasPool: false,
    hasGym: false,
    images: [],
    floor: 1,
    letter: 'B',
    bathrooms: 1,
    rooms: 2,
    additionalInfo: 'Pet-friendly neighborhood.',
    rating: 4.0,
  },
  {
    id: 3,
    name: 'Modern Flat',
    price: 950,
    expenses: 120,
    owner: 'Alice Brown',
    description: 'A modern flat with great amenities.',
    hasParking: true,
    hasPets: true,
    hasPool: true,
    hasGym: true,
    images: [],
    floor: 5,
    letter: 'C',
    bathrooms: 2,
    rooms: 3,
    additionalInfo: 'Perfect for families.',
    rating: 4.8,
  },
  {
    id: 4,
    price: 600,
    name: 'Urban Studio',
    expenses: 80,
    owner: 'Bob Davis',
    description: 'A small studio in the downtown area.',
    hasParking: false,
    hasPets: false,
    hasPool: false,
    hasGym: false,
    images: [],
    floor: 2,
    letter: 'D',
    bathrooms: 1,
    rooms: 1,
    additionalInfo: 'Affordable and compact.',
    rating: 3.9,
  },
  {
    id: 5,
    name: 'Penthouse Suite',
    price: 2500,
    expenses: 300,
    owner: 'Catherine Johnson',
    description: 'A luxurious penthouse with stunning views.',
    hasParking: true,
    hasPets: false,
    hasPool: true,
    hasGym: true,
    images: [],
    floor: 10,
    letter: 'P',
    bathrooms: 3,
    rooms: 4,
    additionalInfo: 'Includes private elevator access.',
    rating: 5.0,
  },
  {
    id: 6,
    name: 'Suburban Home',
    price: 1500,
    expenses: 200,
    owner: 'Emily White',
    description: 'A spacious home in a quiet suburb.',
    hasParking: true,
    hasPets: true,
    hasPool: false,
    hasGym: false,
    images: [],
    floor: 1,
    letter: 'H',
    bathrooms: 2,
    rooms: 3,
    additionalInfo: 'Large backyard for pets.',
    rating: 4.7,
  },
  {
    id: 7,
    name: 'Beachside Condo',
    price: 1800,
    expenses: 250,
    owner: 'Michael Clark',
    description: 'A condo with ocean views.',
    hasParking: true,
    hasPets: true,
    hasPool: true,
    hasGym: true,
    images: [],
    floor: 7,
    letter: 'B',
    bathrooms: 2,
    rooms: 2,
    additionalInfo: 'Steps from the beach.',
    rating: 4.9,
  },
  {
    id: 8,
    name: 'Downtown Flat',
    price: 1000,
    expenses: 130,
    owner: 'Laura Green',
    description: 'Convenient flat in a vibrant area.',
    hasParking: true,
    hasPets: false,
    hasPool: false,
    hasGym: true,
    images: [],
    floor: 4,
    letter: 'D',
    bathrooms: 1,
    rooms: 2,
    additionalInfo: 'Near shops and cafes.',
    rating: 4.2,
  },
  {
    id: 9,
    name: 'Country House',
    price: 1200,
    expenses: 150,
    owner: 'Samuel Lewis',
    description: 'A charming house in the countryside.',
    hasParking: true,
    hasPets: true,
    hasPool: false,
    hasGym: false,
    images: [],
    floor: 1,
    letter: 'C',
    bathrooms: 2,
    rooms: 4,
    additionalInfo: 'Surrounded by nature.',
    rating: 4.6,
  },
  {
    id: 10,
    name: 'City Apartment',
    price: 1100,
    expenses: 140,
    owner: 'Olivia Martinez',
    description: 'A modern apartment in the heart of the city.',
    hasParking: true,
    hasPets: false,
    hasPool: true,
    hasGym: true,
    images: [],
    floor: 6,
    letter: 'A',
    bathrooms: 1,
    rooms: 1,
    additionalInfo: 'Walking distance to landmarks.',
    rating: 4.3,
  },
        ]);
      }, 1000);
    });
  }

  public async getAll(): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data;
  }

  public async filterBy(criteria: Partial<Apartment>): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.filter((item) =>
      Object.entries(criteria).every(([key, value]) => item[key as keyof Apartment] === value)
    );
  } // En principio no sirve para filtrar por estrellas. 

  public async filterByRating(rating: number): Promise<Apartment[]> {
    if (!this.isLoaded) {
      await this.initialize();
    }
    return this.data.filter((item) => item.rating >= rating);
  } 

  public addData(newItem: Apartment): void {
    this.data.push(newItem);
  }

  public updateData(id: number, updatedData: Partial<Apartment>): void {
    this.data = this.data.map((item) =>
      item.id === id ? { ...item, ...updatedData } : item
    ); 
  }



  public removeData(id: number): void {
    this.data = this.data.filter((item) => item.id !== id);
  }
}

export default Cache;
