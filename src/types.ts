
export interface AssetVersion {
  date: string;
  modelUrl: string;
  label: string;
}

export interface Asset3D {
  id: string;
  title: string;
  thumbnail: string;
  modelUrl?: string;
  date: string;
  category: 'Personal' | 'Object' | 'Environment' | 'Art';
  tags?: string[];
  author?: {
    name: string;
    avatar: string;
  };
  description?: string;
  polyCount: string;
  fileSize: string;
  aiInsights?: string;
  isHighlighted?: boolean;
  versions?: AssetVersion[]; // For Time Series
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  isLoggedIn: boolean;
}

export type AppView = 'landing' | 'gallery' | 'detail';

// Extend JSX namespace to include the <model-viewer> custom element

