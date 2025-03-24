import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Maximize, Minimize, Volume2, VolumeX, Play, Pause, List } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface VideoPlayerProps {
  videoId?: string;
  playlistId?: string;
  title: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoId, playlistId, title, onClose }: VideoPlayerProps) {
  const { t } = useTranslation();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const playerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Auto-hide controls
  const showControls = () => {
    setIsControlsVisible(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setIsControlsVisible(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && playerRef.current) {
      playerRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const embedUrl = playlistId 
    ? `https://www.youtube.com/embed/videoseries?list=${playlistId}&autoplay=1&mute=${isMuted ? 1 : 0}&playing=${isPlaying ? 1 : 0}`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&playing=${isPlaying ? 1 : 0}`;

  return (
    <div 
      ref={playerRef}
      className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}
      onMouseMove={showControls}
      onMouseEnter={() => setIsControlsVisible(true)}
    >
      {/* Video Title Bar */}
      <div className={`absolute top-0 left-0 right-0 bg-gradient-to-b from-black/90 to-transparent 
                    p-3 flex items-center justify-between z-10 transition-opacity duration-300
                    ${isControlsVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-white truncate max-w-[200px] sm:max-w-none">
            {title}
          </h3>
          {playlistId && (
            <span className="flex items-center space-x-1 text-sm text-purple-400">
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Playlist</span>
            </span>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {/* WhatsApp Button */}
          <a
            href="https://wa.me/15551234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-500/90 hover:bg-green-500 
                     text-white px-3 py-1.5 rounded-full transition-all duration-300 
                     group text-sm shadow-lg hover:shadow-green-500/25"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="hidden sm:inline group-hover:scale-105 transition-transform">
              {t('contact.whatsapp.cta')}
            </span>
          </a>

          {/* Control Buttons */}
          <div className="flex items-center space-x-2 bg-black/40 rounded-full p-1">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 text-white hover:text-purple-400 transition-colors rounded-full
                       hover:bg-white/10"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            <button
              onClick={toggleFullscreen}
              className="p-1.5 text-white hover:text-purple-400 transition-colors rounded-full
                       hover:bg-white/10"
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
            
            <button
              onClick={onClose}
              className="p-1.5 text-white hover:text-red-400 transition-colors rounded-full
                       hover:bg-white/10"
              aria-label="Close video"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlay}
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                 p-4 rounded-full bg-purple-500/80 hover:bg-purple-500 
                 transition-all duration-300 z-10
                 ${isControlsVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
      </button>

      {/* Video Player */}
      <div className="aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden shadow-2xl">
        <iframe
          src={embedUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
}