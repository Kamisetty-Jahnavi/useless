import React, { useState } from 'react';
import { Plus, Video, Eye } from 'lucide-react';

interface Video {
  id: string;
  title: string;
  url: string;
  module: string;
  chapter: string;
  viewCount: number;
}

interface VideoContentProps {
  section: string;
}

const VideoContent: React.FC<VideoContentProps> = ({ section }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [newVideo, setNewVideo] = useState({
    title: '',
    url: '',
    module: '',
    chapter: ''
  });

  const addVideo = () => {
    if (!newVideo.title || !newVideo.url || !newVideo.module || !newVideo.chapter) return;

    const video: Video = {
      id: crypto.randomUUID(),
      ...newVideo,
      viewCount: 0
    };

    setVideos([...videos, video]);
    setNewVideo({ title: '', url: '', module: '', chapter: '' });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-6">Video Content for {section}</h2>

      <div className="grid gap-4 mb-6">
        <input
          type="text"
          value={newVideo.title}
          onChange={(e) => setNewVideo({ ...newVideo, title: e.target.value })}
          className="p-2 border rounded-lg"
          placeholder="Video title"
        />
        <input
          type="text"
          value={newVideo.url}
          onChange={(e) => setNewVideo({ ...newVideo, url: e.target.value })}
          className="p-2 border rounded-lg"
          placeholder="YouTube URL"
        />
        <input
          type="text"
          value={newVideo.module}
          onChange={(e) => setNewVideo({ ...newVideo, module: e.target.value })}
          className="p-2 border rounded-lg"
          placeholder="Module name"
        />
        <input
          type="text"
          value={newVideo.chapter}
          onChange={(e) => setNewVideo({ ...newVideo, chapter: e.target.value })}
          className="p-2 border rounded-lg"
          placeholder="Chapter name"
        />
        <button
          onClick={addVideo}
          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      <div className="grid gap-4">
        {videos.map(video => (
          <div key={video.id} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{video.title}</h3>
              <div className="flex items-center gap-2 text-gray-500">
                <Eye className="w-4 h-4" />
                <span>{video.viewCount} views</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>Module: {video.module}</p>
              <p>Chapter: {video.chapter}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoContent;