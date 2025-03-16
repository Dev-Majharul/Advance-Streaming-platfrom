import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { v4 as uuidv4 } from 'uuid';

/**
 * Upload a file to Firebase Storage
 * @param file The file to upload
 * @param path The storage path (e.g., 'videos' or 'thumbnails')
 * @returns Promise with the download URL
 */
export const uploadFile = async (file: File, path: string): Promise<string> => {
  try {
    // Create a unique filename with the original extension
    const fileName = `${path}/${uuidv4()}-${file.name}`;
    const storageRef = ref(storage, fileName);
    
    // Upload the file
    await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
};

/**
 * Delete a file from Firebase Storage
 * @param url The download URL of the file to delete
 * @returns Promise indicating success
 */
export const deleteFile = async (url: string): Promise<void> => {
  try {
    if (!url || !url.includes('firebasestorage')) {
      // Not a Firebase Storage URL, nothing to delete
      return;
    }
    
    const fileRef = ref(storage, url);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw new Error('Failed to delete file');
  }
};

/**
 * Extract filename from a Firebase Storage URL
 * @param url The download URL
 * @returns The filename
 */
export const getFilenameFromUrl = (url: string): string => {
  try {
    // Extract the filename after the last slash and before any query parameters
    const urlWithoutParams = url.split('?')[0];
    const segments = urlWithoutParams.split('/');
    return segments[segments.length - 1];
  } catch {
    return 'unknown_file';
  }
}; 