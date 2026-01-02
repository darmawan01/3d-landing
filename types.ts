
export interface Asset3D {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl?: string; // Link to actual .glb file
  date: string;
  category: 'Personal' | 'Object' | 'Environment' | 'Art';
  description?: string;
  polyCount: string;
  fileSize: string;
  aiInsights?: string;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export type AppView = 'landing' | 'gallery' | 'detail';
