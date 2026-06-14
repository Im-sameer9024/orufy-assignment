import { apiConnector } from '@/services/apiConnector.js';
import { productApiUrls } from '@/services/apiEndpoints.js';

const { GET_ALL_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT, TOGGLE_PUBLISH } = productApiUrls;

export const ProductApiOperations = {
  GetAllProducts: async ({ page = 1, limit = 9, search = '', status = 'published' } = {}) => {
    const response = await apiConnector({
      method: 'GET',
      url: GET_ALL_PRODUCTS,
      params: {
        page,
        limit,
        search,
        status,
      },
    });

    return response.data;
  },

  CreateProduct: async (formData) => {
    const response = await apiConnector({
      method: 'POST',
      url: CREATE_PRODUCT,
      bodyData: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  UpdateProduct: async (id, formData) => {
    const response = await apiConnector({
      method: 'PUT',
      url: `${UPDATE_PRODUCT}/${id}`,
      bodyData: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  DeleteProduct: async (id) => {
    const response = await apiConnector({
      method: 'DELETE',
      url: `${DELETE_PRODUCT}/${id}`,
    });

    return response.data;
  },

  TogglePublishProduct: async (id) => {
    const response = await apiConnector({
      method: 'PATCH',
      url: `${TOGGLE_PUBLISH}/${id}`,
    });

    return response.data;
  },
};
