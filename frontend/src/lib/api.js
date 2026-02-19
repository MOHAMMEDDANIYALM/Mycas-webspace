const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getApiBaseUrl = () => {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');
  }

  return API_BASE_URL;
};

export const api = {
  request: async (path, options = {}) => {
    const response = await fetch(`${getApiBaseUrl()}${path}`, {
      method: options.method || 'GET',
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...(options.headers || {})
      },
      credentials: 'include',
      ...(options.body ? { body: JSON.stringify(options.body) } : {})
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  },

  post: async (path, body, options = {}) => {
    return api.request(path, {
      ...options,
      method: 'POST',
      body
    });
  },

  patch: async (path, body, options = {}) => {
    return api.request(path, {
      ...options,
      method: 'PATCH',
      body
    });
  },

  delete: async (path, options = {}) => {
    return api.request(path, {
      ...options,
      method: 'DELETE'
    });
  },

  get: async (path, options = {}) => {
    return api.request(path, {
      ...options,
      method: 'GET'
    });
  }
};
