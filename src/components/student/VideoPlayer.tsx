import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId, onProgress, onComplete }) => {
  const [player, setPlayer] = useState<any>(null);
  const [watching, setWatching] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (watching && player) {
      interval = setInterval(async () => {
        const currentTime = await player.getCurrentTime();
        const duration = await player.getDuration();
        const newProgress = (currentTime / duration) * 100;
        
        setProgress(newProgress);
        onProgress(newProgress);

        if (newProgress >= 90) {
          onComplete();
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [watching, player]);

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  const onStateChange = (event: any) => {
    setWatching(event.data === 1); // 1 means playing
  };

  return (
    <div className="relative">
      <YouTube
        videoId={videoId}
        onReady={onReady}
        onStateChange={onStateChange}
        opts={{
          width: '100%',
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0
          }
        }}
      />
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 mt-1">{Math.round(progress)}% complete</span>
      </div>
    </div>
  );
};

export default VideoPlayer;