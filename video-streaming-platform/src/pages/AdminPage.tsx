import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tab } from '@headlessui/react';
import { toast } from 'react-hot-toast';
import { useVideos } from '../contexts/VideoContext';
import { Video, VideoFormData } from '../types';
import VideoForm from '../components/VideoForm';
import AdminVideoTable from '../components/AdminVideoTable';

const AdminPage: React.FC = () => {
  const { videos, addVideo, updateVideo, getVideoById } = useVideos();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [videoToEdit, setVideoToEdit] = useState<Video | null>(null);

  // Check if there's an edit parameter in the URL
  useEffect(() => {
    const fetchVideoToEdit = async () => {
      const params = new URLSearchParams(location.search);
      const editVideoId = params.get('edit');
      
      if (editVideoId) {
        try {
          const video = await getVideoById(editVideoId);
          if (video) {
            setVideoToEdit(video);
            setSelectedTab(1); // Switch to the Add/Edit tab
          } else {
            toast.error('Video not found');
          }
        } catch (error) {
          console.error('Error fetching video to edit:', error);
          toast.error('Failed to load video for editing');
        }
      }
    };

    fetchVideoToEdit();
  }, [location.search, getVideoById]);

  // Handle form submission for adding a new video
  const handleAddVideo = async (data: VideoFormData) => {
    try {
      setIsSubmitting(true);
      await addVideo(data);
      toast.success('Video added successfully');
      setSelectedTab(0); // Switch back to list view
    } catch (error) {
      console.error('Error adding video:', error);
      toast.error('Failed to add video. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission for updating an existing video
  const handleUpdateVideo = async (data: VideoFormData) => {
    if (!videoToEdit) return;
    
    try {
      setIsSubmitting(true);
      await updateVideo(videoToEdit.id, data);
      toast.success('Video updated successfully');
      setVideoToEdit(null);
      setSelectedTab(0); // Switch back to list view
      
      // Clear the edit parameter from URL
      navigate('/admin', { replace: true });
    } catch (error) {
      console.error('Error updating video:', error);
      toast.error('Failed to update video. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle edit button click in the video table
  const handleEditVideo = (video: Video) => {
    setVideoToEdit(video);
    setSelectedTab(1); // Switch to the Add/Edit tab
    
    // Update URL to reflect editing state (for browser history/refresh)
    navigate(`/admin?edit=${video.id}`, { replace: true });
  };

  // Cancel editing and go back to list view
  const handleCancelEdit = () => {
    setVideoToEdit(null);
    setSelectedTab(0);
    navigate('/admin', { replace: true });
  };

  return (
    <div className="py-6 animate-fadeIn">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>

        {/* Tab Interface */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
            <Tab.List className="flex bg-gray-50 border-b border-gray-200">
              <Tab
                className={({ selected }) =>
                  `px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none ${
                    selected
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                Videos
              </Tab>
              <Tab
                className={({ selected }) =>
                  `px-6 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none ${
                    selected
                      ? 'border-primary-600 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`
                }
              >
                {videoToEdit ? 'Edit Video' : 'Add Video'}
              </Tab>
            </Tab.List>

            <Tab.Panels>
              {/* Videos Table Panel */}
              <Tab.Panel className="p-6">
                <AdminVideoTable
                  videos={videos}
                  onEditVideo={handleEditVideo}
                />
              </Tab.Panel>

              {/* Add/Edit Video Panel */}
              <Tab.Panel className="p-6">
                {videoToEdit ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">Edit Video</h2>
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                    <VideoForm
                      initialData={videoToEdit}
                      onSubmit={handleUpdateVideo}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                ) : (
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Add New Video</h2>
                    <VideoForm
                      onSubmit={handleAddVideo}
                      isSubmitting={isSubmitting}
                    />
                  </div>
                )}
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 