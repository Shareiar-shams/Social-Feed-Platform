import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Dispatch custom event for token expiration
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export interface Post {
  id: number;
  user_id: number;
  content: string;
  image?: string;
  visibility: 'public' | 'private';
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
  };
  likes_count?: number;
  likes?: any[];
}

export interface CreatePostData {
  content: string;
  visibility: 'public' | 'private';
  image?: File;
}

export interface UpdatePostData {
  content?: string;
  visibility?: 'public' | 'private';
  image?: File;
  remove_image?: boolean;
}

export const postService = {
  // Get all posts
  async getAllPosts(): Promise<Post[]> {
    const response = await api.get('/posts');
    return response.data;
  },

  // Create a new post
  async createPost(data: CreatePostData): Promise<{ message: string; post: Post }> {
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('visibility', data.visibility);
    
    if (data.image) {
      formData.append('image', data.image);
    }

    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get a single post
  async getPost(id: number): Promise<Post> {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  },

  // Update a post
  async updatePost(id: number, data: UpdatePostData): Promise<{ message: string; post: Post }> {
    const formData = new FormData();
    
    if (data.content !== undefined) {
      formData.append('content', data.content);
    }
    
    if (data.visibility !== undefined) {
      formData.append('visibility', data.visibility);
    }
    
    if (data.image) {
      formData.append('image', data.image);
    }
    
    if (data.remove_image) {
      formData.append('remove_image', '1');
    }

    // Use POST for file uploads
    const response = await api.post(`/posts/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Delete a post
  async deletePost(id: number): Promise<{ message: string }> {
    const response = await api.delete(`/posts/${id}`);
    return response.data;
  },
};
