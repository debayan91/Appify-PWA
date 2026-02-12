import { useRef, useEffect } from 'react';

const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked, that's okay
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      {/* Video Layer */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="https://assets.mixkit.co/videos/preview/mixkit-pov-of-walking-on-a-busy-street-4357-large.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* Dark Overlay - 40% opacity */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* LIDAR Grid Overlay */}
      <div className="lidar-grid" />
    </div>
  );
};

export default VideoBackground;
