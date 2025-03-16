import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-hot-toast';
import { Video, VideoFormData } from '../types';

interface VideoFormProps {
  initialData?: Video;
  onSubmit: (data: VideoFormData) => Promise<void>;
  isSubmitting: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({ 
  initialData, 
  onSubmit, 
  isSubmitting 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'upload' | 'embed'>('upload');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [embedCode, setEmbedCode] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // Initialize form with existing data if available
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setType(initialData.type);
      
      if (initialData.thumbnailUrl) {
        setThumbnailUrl(initialData.thumbnailUrl);
        setThumbnailPreview(initialData.thumbnailUrl);
      }
      
      if (initialData.type === 'embed' && initialData.embedCode) {
        setEmbedCode(initialData.embedCode);
      } else if (initialData.type === 'upload' && initialData.videoUrl) {
        setVideoPreview(initialData.videoUrl);
      }
    }
  }, [initialData]);

  // Video dropzone configuration
  const {
    getRootProps: getVideoRootProps,
    getInputProps: getVideoInputProps,
    isDragActive: isVideoDragActive,
  } = useDropzone({
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg', '.mov']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setVideoFile(file);
        const objectUrl = URL.createObjectURL(file);
        setVideoPreview(objectUrl);
        
        // Clean up the preview URL when component unmounts
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    },
  });

  // Thumbnail dropzone configuration
  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive,
  } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setThumbnailFile(file);
        const objectUrl = URL.createObjectURL(file);
        setThumbnailPreview(objectUrl);
        setThumbnailUrl('');
        
        // Clean up the preview URL when component unmounts
        return () => {
          URL.revokeObjectURL(objectUrl);
        };
      }
    },
  });

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validation
      if (!title.trim()) {
        return toast.error('Title is required');
      }

      if (type === 'upload' && !videoFile && !videoPreview) {
        return toast.error('Video file is required for upload type');
      }

      if (type === 'embed' && !embedCode.trim()) {
        return toast.error('Embed code is required for embed type');
      }

      // Prepare form data
      const formData: VideoFormData = {
        title: title.trim(),
        description: description.trim(),
        type,
      };

      // Add type-specific fields
      if (type === 'upload') {
        if (videoFile) {
          formData.videoFile = videoFile;
        }
      } else if (type === 'embed') {
        formData.embedCode = embedCode.trim();
      }

      // Add thumbnail data
      if (thumbnailFile) {
        formData.thumbnailFile = thumbnailFile;
      } else if (thumbnailUrl) {
        formData.thumbnailUrl = thumbnailUrl;
      }

      // Submit the form
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to submit video. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title field */}
      <div>
        <label htmlFor="title" className="label">
          Video Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Enter video title"
          required
        />
      </div>

      {/* Description field */}
      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="input"
          placeholder="Enter video description"
        />
      </div>

      {/* Video type selector */}
      <div>
        <label className="label">Video Type</label>
        <div className="flex space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="videoType"
              value="upload"
              checked={type === 'upload'}
              onChange={() => setType('upload')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Upload Video</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="videoType"
              value="embed"
              checked={type === 'embed'}
              onChange={() => setType('embed')}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500"
            />
            <span className="ml-2 text-sm text-gray-700">Embed Code</span>
          </label>
        </div>
      </div>

      {/* Thumbnail section */}
      <div>
        <label className="label">Thumbnail Image</label>
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Thumbnail preview */}
          {thumbnailPreview && (
            <div className="relative group aspect-video bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={thumbnailPreview}
                alt="Thumbnail preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setThumbnailPreview(null);
                  setThumbnailFile(null);
                  setThumbnailUrl('');
                }}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          )}

          {/* Thumbnail dropzone or URL input */}
          <div className="space-y-2">
            <div
              {...getThumbnailRootProps()}
              className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                isThumbnailDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
              }`}
            >
              <input {...getThumbnailInputProps()} />
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4h-8m-12 0v-8"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  Drag & drop an image or click to browse
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">-- OR --</div>

            <div>
              <label htmlFor="thumbnailUrl" className="sr-only">
                Thumbnail URL
              </label>
              <input
                type="text"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => {
                  setThumbnailUrl(e.target.value);
                  if (e.target.value && !thumbnailFile) {
                    setThumbnailPreview(e.target.value);
                  }
                }}
                className="input text-sm"
                placeholder="Enter thumbnail URL"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video upload/embed section */}
      {type === 'upload' ? (
        <div>
          <label className="label">
            Video File {!videoPreview && <span className="text-red-500">*</span>}
          </label>
          
          {/* Video preview */}
          {videoPreview && (
            <div className="relative mb-4 aspect-video bg-black rounded-lg overflow-hidden">
              <video
                src={videoPreview}
                controls
                className="w-full h-full"
              ></video>
              {!initialData?.videoUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setVideoPreview(null);
                    setVideoFile(null);
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          )}
          
          {/* Dropzone */}
          {(!videoPreview || !initialData?.videoUrl) && (
            <div
              {...getVideoRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition-colors ${
                isVideoDragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
              }`}
            >
              <input {...getVideoInputProps()} />
              <div className="space-y-1">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M25 6l-4 4H9a2 2 0 00-2 2v24a2 2 0 002 2h30a2 2 0 002-2V12a2 2 0 00-2-2h-12l-4-4z"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M21 23a3 3 0 103 3M18 26l-2.5 2.5m14-11.5a3 3 0 00-3-3M29 17l2.5-2.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="text-sm text-gray-500">
                  Drag & drop your video or click to browse
                </p>
                <p className="text-xs text-gray-500">MP4, WebM, Ogg up to 200MB</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>
          <label htmlFor="embedCode" className="label">
            Embed Code <span className="text-red-500">*</span>
          </label>
          <textarea
            id="embedCode"
            value={embedCode}
            onChange={(e) => setEmbedCode(e.target.value)}
            rows={5}
            className="input font-mono text-sm"
            placeholder="Paste iframe embed code here..."
            required={type === 'embed'}
          />
          <p className="mt-1 text-sm text-gray-500">
            Paste the iframe embed code from YouTube, Vimeo, or other platforms
          </p>
        </div>
      )}

      {/* Submit button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary py-2 px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : initialData ? (
            'Update Video'
          ) : (
            'Add Video'
          )}
        </button>
      </div>
    </form>
  );
};

export default VideoForm; 