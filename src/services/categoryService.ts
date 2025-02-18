import api from '../lib/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

class CategoryService {
  async getAll(): Promise<Category[]> {
    const response = await api.get('/categories');
    return response.data;
  }
}

export const categoryService = new CategoryService();
