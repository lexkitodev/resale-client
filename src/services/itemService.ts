import api from '../lib/api';

export interface Item {
  id: number;
  title: string;
  description: string | null;
  startPrice: number;
  currentBid: number | null;
  retailPrice: number;
  imageUrl: string;
  endTime: string;
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
}

export interface ItemsResponse {
  items: Item[];
  total: number;
  hasMore: boolean;
}

class ItemService {
  async getLatest(page: number = 1): Promise<ItemsResponse> {
    const response = await api.get<ItemsResponse>('/categories/latest', {
      params: { page },
    });
    return response.data;
  }

  async getByCategory(slug: string, page: number = 1): Promise<ItemsResponse> {
    const response = await api.get<ItemsResponse>(`/categories/${slug}/items`, {
      params: { page },
    });
    return response.data;
  }

  async getById(id: number): Promise<Item> {
    const response = await api.get<Item>(`/categories/items/${id}`);
    return response.data;
  }
}

export const itemService = new ItemService();
