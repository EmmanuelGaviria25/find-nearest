import axios from 'axios';
import { City } from '../models/City';

export async function loadCities(): Promise<City[]> {
  try {
    const response = await axios.get('https://emmanuelgaviria25.github.io/find-nearest/data/cities.json'); // Sustituir por el enlace del archivo JSON
    return response.data;
  } catch (error) {
    console.error("Error loading cities:", error);
    return [];
  }
}
