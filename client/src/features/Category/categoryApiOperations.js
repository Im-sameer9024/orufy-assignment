import { apiConnector } from '@/services/apiConnector.js';
import { categoryApiUrls } from '@/services/apiEndpoints.js';

const { GET_ALL_CATEGORIES, CREATE_CATEGORY } = categoryApiUrls;

export const CategoryApiOperations = {
  GetAllCategories: async () => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_CATEGORIES,
    });
    return response.data;
  },

  CreateCategory: async (data) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_CATEGORY,
      bodyData: data,
    });
    return response.data;
  },
};
