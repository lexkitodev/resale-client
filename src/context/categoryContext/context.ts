import { createContext } from 'react';
import type { Category } from '../../services/categoryService';

interface CategoryContextType {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);
