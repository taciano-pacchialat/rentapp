export type Apartment = {
  id: number;
  name: string;
  price: number;
  expenses: number;
  owner: number;
  description: string;
  hasParking: boolean;
  hasPets: boolean;
  hasPool: boolean;
  rating: number;
  hasGym: boolean;
  images: string[];
  floor: number;
  letter: string;
  bathrooms: number;
  rooms: number;
  additionalInfo: string;
};
