import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import { useVideos } from '../contexts/VideoContext';
import { Video } from '../types';
import { useAuth } from '../contexts/AuthContext';

const VideoPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { getVideoById } = useVideos();
  const { isAdmin } = useAuth();
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true);
        setError('');
        
        if (!videoId) {
          setError('Video ID is missing');
          return;
        }
        
        const videoData = await getVideoById(videoId);
        if (!videoData) {
          setError('Video not found');
          return;
        }
        
        setVideo(videoData);
      } catch (err) {
        console.error('Error fetching video:', err);
        setError('Failed to load the video. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideo();
  }, [videoId, getVideoById]);

  const handleEditClick = () => {
    navigate(`/admin?edit=${videoId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-2xl font-bold mb-4">{error || 'Video not found'}</h1>
        <p className="text-gray-600 mb-8">The video you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Video Player */}
        <div className="aspect-video bg-black">
          {video.type === 'upload' && video.videoUrl ? (
            <ReactPlayer
              url={video.videoUrl}
              width="100%"
              height="100%"
              controls
              playing
              config={{
                file: {
                  attributes: {
                    controlsList: 'nodownload', // Disable download button
                  },
                },
              }}
            />
          ) : video.type === 'embed' && video.embedCode ? (
            <div
              className="w-full h-full"
              dangerouslySetInnerHTML={{ __html: video.embedCode }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white">
              Video unavailable
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
            {isAdmin && (
              <button
                onClick={handleEditClick}
                className="btn btn-secondary flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Video
              </button>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-500 mb-6">
            <div className="flex items-center mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              {video.views} views
            </div>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1 inline"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {new Date(video.createdAt).toLocaleDateString()}
            </div>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <h2 className="text-lg font-semibold mb-3">Description</h2>
            <p className="text-gray-700 whitespace-pre-line">{video.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPage; 