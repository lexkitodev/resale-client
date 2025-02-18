import { useState, useEffect, ReactNode } from 'react';
import { CategoryContext } from './context';
import { categoryService, Category } from '../../services/categoryService';

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoryService.getAll();
        setCategories(data);
      } catch (err) {
        setError('Failed to load categories');
        console.error('Failed to load categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, isLoading, error }}>
      {children}
    </CategoryContext.Provider>
  );
}
