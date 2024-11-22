import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const validateName = (name: string) => {
  const re = /^[A-Z][a-zA-Z ]*(?: [A-Z][a-zA-Z ]*)* [A-Z][a-zA-Z ]*(?: [A-Z][a-zA-Z ]*)*$/;
  return re.test(name);
};

export const validatePassword = (password: string) => {
  const re = /^(?=(?:.*\d){2,})(?=(?:.*[@$!%*#?&]){2,})(?=(?:.*[A-Z]){2,}).{8,}$/;
  return re.test(password);
};

export const validateDNI = (dni: string) => {
  const re = /^\d{7,8}$/;
  return re.test(dni);
};


