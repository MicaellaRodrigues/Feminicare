// src/types/index.ts
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Professional {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  credential?: string;
  specialty: string;
  description?: string;
  imageUrl?: string;
  location?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  rating: number;
  ratingCount: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  authorId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content {
  id: string;
  title: string;
  body: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  authorId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Administrator {
  id: string;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}