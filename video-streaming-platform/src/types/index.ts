export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin: boolean;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl?: string;
  embedCode?: string;
  type: 'embed' | 'upload';
  createdAt: number;
  updatedAt: number;
  uploadedBy: string;
  views: number;
}

export interface VideoFormData {
  title: string;
  description: string;
  thumbnailFile?: File;
  videoFile?: File;
  thumbnailUrl?: string;
  embedCode?: string;
  type: 'embed' | 'upload';
} 