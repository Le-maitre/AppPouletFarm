export interface Recette {
    id?: number; // Optional as it will be assigned by the backend
    nombrePoulet: number;
    prix: number;
    dateVente: string; // Assuming date is in string format
  }
  