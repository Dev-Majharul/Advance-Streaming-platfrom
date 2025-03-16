import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  addDoc,
  getDoc,
  where,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../firebase';
import { Video, VideoFormData } from '../types';
import { useAuth } from './AuthContext';

interface VideoContextType {
  videos: Video[];
  isLoading: boolean;
  searchVideos: (searchTerm: string) => Promise<Video[]>;
  addVideo: (videoData: VideoFormData) => Promise<string>;
  updateVideo: (id: string, videoData: VideoFormData) => Promise<void>;
  deleteVideo: (id: string) => Promise<void>;
  getVideoById: (id: string) => Promise<Video | null>;
}

const VideoContext = createContext<VideoContextType | null>(null);

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useAuth();

  // Fetch all videos on component mount
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const q = query(collection(db, 'videos'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedVideos: Video[] = [];
        querySnapshot.forEach((doc) => {
          fetchedVideos.push({ id: doc.id, ...doc.data() } as Video);
        });
        
        setVideos(fetchedVideos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // Search videos by title or description
  const searchVideos = async (searchTerm: string): Promise<Video[]> => {
    if (!searchTerm.trim()) {
      return videos;
    }

    const searchTermLower = searchTerm.toLowerCase();
    return videos.filter(
      (video) =>
        video.title.toLowerCase().includes(searchTermLower) ||
        video.description.toLowerCase().includes(searchTermLower)
    );
  };

  // Get a video by ID
  const getVideoById = async (id: string): Promise<Video | null> => {
    try {
      const videoDoc = await getDoc(doc(db, 'videos', id));
      if (videoDoc.exists()) {
        return { id: videoDoc.id, ...videoDoc.data() } as Video;
      }
      return null;
    } catch (error) {
      console.error('Error getting video:', error);
      return null;
    }
  };

  // Add a new video
  const addVideo = async (videoData: VideoFormData): Promise<string> => {
    try {
      if (!currentUser) {
        throw new Error('You must be logged in to add a video');
      }

      const now = Date.now();
      let thumbnailUrl = videoData.thumbnailUrl || '';
      let videoUrl = '';

      // If it's an upload type video with files
      if (videoData.type === 'upload') {
        // Upload video file if provided
        if (videoData.videoFile) {
          const videoFileName = `videos/${uuidv4()}-${videoData.videoFile.name}`;
          const videoFileRef = ref(storage, videoFileName);
          await uploadBytes(videoFileRef, videoData.videoFile);
          videoUrl = await getDownloadURL(videoFileRef);
        } else {
          throw new Error('Video file is required for upload type');
        }

        // Upload thumbnail if provided
        if (videoData.thumbnailFile) {
          const thumbnailFileName = `thumbnails/${uuidv4()}-${videoData.thumbnailFile.name}`;
          const thumbnailFileRef = ref(storage, thumbnailFileName);
          await uploadBytes(thumbnailFileRef, videoData.thumbnailFile);
          thumbnailUrl = await getDownloadURL(thumbnailFileRef);
        }
      }

      // Create new video document
      const newVideo: Omit<Video, 'id'> = {
        title: videoData.title,
        description: videoData.description,
        thumbnailUrl,
        type: videoData.type,
        createdAt: now,
        updatedAt: now,
        uploadedBy: currentUser.uid,
        views: 0,
      };

      // Add videoUrl or embedCode based on type
      if (videoData.type === 'upload') {
        newVideo.videoUrl = videoUrl;
      } else if (videoData.type === 'embed') {
        if (!videoData.embedCode) {
          throw new Error('Embed code is required for embed type');
        }
        newVideo.embedCode = videoData.embedCode;
      }

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'videos'), newVideo);
      
      // Update local state
      const addedVideo = { id: docRef.id, ...newVideo } as Video;
      setVideos((prevVideos) => [addedVideo, ...prevVideos]);
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding video:', error);
      throw error;
    }
  };

  // Update an existing video
  const updateVideo = async (id: string, videoData: VideoFormData): Promise<void> => {
    try {
      const videoRef = doc(db, 'videos', id);
      const videoDoc = await getDoc(videoRef);
      
      if (!videoDoc.exists()) {
        throw new Error('Video not found');
      }
      
      const existingVideo = videoDoc.data() as Omit<Video, 'id'>;
      const updates: Partial<Video> = {
        title: videoData.title,
        description: videoData.description,
        updatedAt: Date.now(),
      };

      // Handle thumbnail updates
      if (videoData.thumbnailFile) {
        // Delete old thumbnail if it's not a URL
        if (existingVideo.thumbnailUrl && existingVideo.thumbnailUrl.includes('firebasestorage')) {
          try {
            const oldThumbnailRef = ref(storage, existingVideo.thumbnailUrl);
            await deleteObject(oldThumbnailRef);
          } catch (error) {
            console.warn('Could not delete old thumbnail:', error);
          }
        }

        // Upload new thumbnail
        const thumbnailFileName = `thumbnails/${uuidv4()}-${videoData.thumbnailFile.name}`;
        const thumbnailFileRef = ref(storage, thumbnailFileName);
        await uploadBytes(thumbnailFileRef, videoData.thumbnailFile);
        updates.thumbnailUrl = await getDownloadURL(thumbnailFileRef);
      } else if (videoData.thumbnailUrl) {
        updates.thumbnailUrl = videoData.thumbnailUrl;
      }

      // Handle video updates based on type
      if (videoData.type === 'upload' && videoData.videoFile) {
        // Delete old video if it exists
        if (existingVideo.videoUrl) {
          try {
            const oldVideoRef = ref(storage, existingVideo.videoUrl);
            await deleteObject(oldVideoRef);
          } catch (error) {
            console.warn('Could not delete old video:', error);
          }
        }

        // Upload new video
        const videoFileName = `videos/${uuidv4()}-${videoData.videoFile.name}`;
        const videoFileRef = ref(storage, videoFileName);
        await uploadBytes(videoFileRef, videoData.videoFile);
        updates.videoUrl = await getDownloadURL(videoFileRef);
        updates.type = 'upload';
        
        // Remove embed code if switching from embed to upload
        if (existingVideo.embedCode) {
          updates.embedCode = '';
        }
      } else if (videoData.type === 'embed' && videoData.embedCode) {
        updates.embedCode = videoData.embedCode;
        updates.type = 'embed';
        
        // Remove video URL if switching from upload to embed
        if (existingVideo.videoUrl) {
          try {
            const oldVideoRef = ref(storage, existingVideo.videoUrl);
            await deleteObject(oldVideoRef);
          } catch (error) {
            console.warn('Could not delete old video:', error);
          }
          updates.videoUrl = '';
        }
      }

      // Update Firestore
      await updateDoc(videoRef, updates);
      
      // Update local state
      setVideos((prevVideos) =>
        prevVideos.map((video) =>
          video.id === id ? { ...video, ...updates } : video
        )
      );
    } catch (error) {
      console.error('Error updating video:', error);
      throw error;
    }
  };

  // Delete a video
  const deleteVideo = async (id: string): Promise<void> => {
    try {
      const videoRef = doc(db, 'videos', id);
      const videoDoc = await getDoc(videoRef);
      
      if (!videoDoc.exists()) {
        throw new Error('Video not found');
      }
      
      const videoData = videoDoc.data() as Video;
      
      // Delete video file from storage if it's an upload type
      if (videoData.type === 'upload' && videoData.videoUrl) {
        try {
          const videoFileRef = ref(storage, videoData.videoUrl);
          await deleteObject(videoFileRef);
        } catch (error) {
          console.warn('Could not delete video file:', error);
        }
      }
      
      // Delete thumbnail if it's a stored file
      if (videoData.thumbnailUrl && videoData.thumbnailUrl.includes('firebasestorage')) {
        try {
          const thumbnailRef = ref(storage, videoData.thumbnailUrl);
          await deleteObject(thumbnailRef);
        } catch (error) {
          console.warn('Could not delete thumbnail:', error);
        }
      }
      
      // Delete from Firestore
      await deleteDoc(videoRef);
      
      // Update local state
      setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
      throw error;
    }
  };

  const value = {
    videos,
    isLoading,
    searchVideos,
    addVideo,
    updateVideo,
    deleteVideo,
    getVideoById,
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
}; 