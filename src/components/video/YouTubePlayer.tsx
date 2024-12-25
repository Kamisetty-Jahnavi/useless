import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { useAuth } from '../../context/AuthContext';
import { updateVideoProgress } from '../../services/analytics';

interface YouTubePlayerProps {
  videoId: string;
  courseId: string;
  lessonId: string;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  courseId,
  lessonId,
  onProgress,
  onComplete
}) => {
  const { user } = useAuth();
  const [player, setPlayer] = useState<any>(null);
  const [lastUpdateTime, setLastUpdateTime] = useState(0);
  const [watchTime, setWatchTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (player) {
      interval = setInterval(async () => {
        const currentTime = await player.getCurrentTime();
        const duration = await player.getDuration();
        const progress = (currentTime / duration) * 100;
        
        // Update progress every 5 seconds or when video completes
        if (currentTime - lastUpdateTime >= 5 || progress >= 95) {
          onProgress(progress);
          setLastUpdateTime(currentTime);
          
          // Update analytics
          await updateVideoProgress({
            userId: user!.id,
            courseId,
            lessonId,
            videoId,
            progress,
            watchTime: currentTime - lastUpdateTime,
            completed: progress >= 95
          });

          if (progress >= 95) {
            onComplete();
          }
        }

        setWatchTime(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [player, lastUpdateTime]);

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
      <YouTube
        videoId={videoId}
        onReady={onReady}
        opts={{
          width: '100%',
          height: '100%',
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0
          }
        }}
      />
    </div>
  );
};

export default YouTubePlayer;