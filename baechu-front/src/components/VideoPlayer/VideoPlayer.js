import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoUrl }) => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const fetchVideoId = async () => {
        try {
          const url = new URL(videoUrl);
          if (url.hostname === 'www.youtube.com' && url.searchParams.has('v')) {
            setVideoId(url.searchParams.get('v'));
          } else {
            throw new Error('Invalid YouTube URL');
          }
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
      };

    fetchVideoId();
  }, [videoUrl]);

  return (
    <div>
      {videoId && (
        <div>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allowFullScreen
            title="YouTube Video"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
