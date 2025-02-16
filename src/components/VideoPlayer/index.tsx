'use client';

import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VideoPlayerProps {
  url: string;
}

const VideoPlayer = ({ url }: VideoPlayerProps) => {
  const [error, setError] = useState<string | null>(null);
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);

  useEffect(() => {
    const processVideo = async () => {
      try {
        // Handle YouTube URLs directly
        if (url.includes('youtu.be') || url.includes('youtube.com')) {
          const videoId = url.includes('youtu.be')
            ? url.split('youtu.be/')[1].split('?')[0]
            : new URLSearchParams(new URL(url).search).get('v');

          if (videoId) {
            setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
            return;
          }
        }

        // For other video types
        setEmbedUrl(url);
      } catch (err) {
        console.error('Error processing video:', err);
        setError('Failed to process video URL');
      }
    };

    processVideo();
  }, [url]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!embedUrl) {
    return (
      <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gray-100 animate-pulse" />
    );
  }

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
      {embedUrl.includes('youtube.com/embed/') ? (
        <iframe
          src={embedUrl}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video player"
        />
      ) : (
        <video
          src={embedUrl}
          className="w-full h-full object-cover"
          controls
          onError={() => setError('Failed to load video')}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
