import { User } from "./user";

export type ApartmentImage = {
  id: number;
  image: string;
  file?: File;
};

export type Apartment = {
  id: number;
  name: string;
  price: number;
  expenses: number;
  owner: User;
  description: string;
  hasParking: boolean;
  hasPets: boolean;
  hasPool: boolean;
  rating: number;
  hasGym: boolean;
  images: ApartmentImage[];
  floor: number;
  letter: string;
  bathrooms: number;
  rooms: number;
  street_address: string;
  additionalInfo: string;
};
