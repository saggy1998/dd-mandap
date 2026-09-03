import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

export default function SoundCloudAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(80);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const iframeRef = useRef(null);
  const widgetRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  const userPausedRef = useRef(false);

  // Initialize SoundCloud Widget ONCE on mount
  useEffect(() => {
    const existingScript = document.getElementById("sc-widget-api");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "sc-widget-api";
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = initWidget;
      document.body.appendChild(script);
    } else {
      if (window.SC && window.SC.Widget) {
        initWidget();
      } else {
        existingScript.addEventListener("load", initWidget);
      }
    }

    function initWidget() {
      if (iframeRef.current && window.SC && window.SC.Widget) {
        const widget = window.SC.Widget(iframeRef.current);
        widgetRef.current = widget;

        widget.bind(window.SC.Widget.Events.READY, () => {
          widget.setVolume(80);
          
          // Attempt autoplay 1 second after component mounts
          autoplayTimerRef.current = setTimeout(() => {
            if (!userPausedRef.current) {
              widget.play();
            }
          }, 1000);
        });

        widget.bind(window.SC.Widget.Events.PLAY, () => setIsPlaying(true));
        widget.bind(window.SC.Widget.Events.PAUSE, () => setIsPlaying(false));
        widget.bind(window.SC.Widget.Events.FINISH, () => setIsPlaying(false));
      }
    }

    // Listener to start playback on first user gesture if browser blocked unmuted autoplay
    const triggerPlaybackOnGesture = () => {
      if (widgetRef.current && !userPausedRef.current && !isPlaying) {
        widgetRef.current.play();
      }
    };

    window.addEventListener("scroll", triggerPlaybackOnGesture, { passive: true, once: true });
    window.addEventListener("pointerdown", triggerPlaybackOnGesture, { once: true });
    window.addEventListener("keydown", triggerPlaybackOnGesture, { once: true });

    return () => {
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
      window.removeEventListener("scroll", triggerPlaybackOnGesture);
      window.removeEventListener("pointerdown", triggerPlaybackOnGesture);
      window.removeEventListener("keydown", triggerPlaybackOnGesture);
    };
  }, []);

  // Sync volume with SoundCloud widget
  useEffect(() => {
    if (widgetRef.current) {
      widgetRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [volume, isMuted]);

  const togglePlay = (e) => {
    if (e) {
      e.stopPropagation();
    }
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    if (!widgetRef.current) return;

    if (isPlaying) {
      userPausedRef.current = true;
      widgetRef.current.pause();
    } else {
      userPausedRef.current = false;
      widgetRef.current.play();
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseInt(e.target.value, 10);
    setVolume(newVol);
    if (newVol === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  return (
    <div className="calming-audio-widget">
      {/* Hidden SoundCloud Iframe Widget with auto_play=true */}
      <iframe
        ref={iframeRef}
        id="sc-player-iframe"
        title="SoundCloud Calming Track"
        width="100%"
        height="166"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fthe_underrated_explorer%2Fsitar-and-tabla-wedding&color=%23c5a059&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        style={{ position: "absolute", width: "1px", height: "1px", opacity: 0, pointerEvents: "none", left: "-9999px" }}
      />

      {/* Floating Minimal Calming Controls */}
      <div className={`calming-audio-pill ${isPlaying ? "is-playing" : ""}`}>
        <button
          type="button"
          className="calming-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause Calming Music" : "Play Calming Music"}
          title={isPlaying ? "Pause Calming Music" : "Play Calming Music"}
        >
          {isPlaying ? (
            <Pause size={16} className="play-icon" />
          ) : (
            <Play size={16} className="play-icon play-icon--offset" />
          )}
        </button>

        {/* Animated Soundwave Equalizer (No text or track title displayed) */}
        <div className="calming-soundwave" onClick={togglePlay} role="button" tabIndex={0}>
          <span className={`wave-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "0ms" }} />
          <span className={`wave-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "150ms" }} />
          <span className={`wave-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "300ms" }} />
          <span className={`wave-bar ${isPlaying ? "animating" : ""}`} style={{ animationDelay: "450ms" }} />
        </div>

        {/* Volume Control Trigger & Slider Popover */}
        <div className="calming-volume-wrapper" onMouseLeave={() => setShowVolumeSlider(false)}>
          <button
            type="button"
            className="calming-volume-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowVolumeSlider(!showVolumeSlider);
            }}
            aria-label="Volume settings"
          >
            {isMuted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {showVolumeSlider && (
            <div className="calming-volume-popover" onClick={(e) => e.stopPropagation()}>
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="calming-volume-slider"
                aria-label="Volume Slider"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
