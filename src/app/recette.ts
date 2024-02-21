export interface Recette {
    id?: number; // Optional as it will be assigned by the backend
    nombre: number;
    prix: number;
    dateVente: Date; // Assuming date is in string format
  }
  