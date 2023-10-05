import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    player: any;
    videojs: any;
  }
}

interface VideoPlayerProps {
  options: any;
  setVideoNode: any;
  playerControlData: any;
  setPlayerControlData: (arg: any) => void;
  setIsLoading: any;
}

const VideoJSPlayer: React.FC<VideoPlayerProps> = ({
  options,
  setVideoNode,
  playerControlData,
  setPlayerControlData,
  setIsLoading,
}) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  let player: any;

  const initialOptions: any = {
    controlBar: false,
    errorDisplay: false,
    textTrackSettings: false,
    bigPlayButton: false,
    loadingSpinner: false,
    posterImage: false,
  };

  console.log("......options.......", options);

  React.useEffect(() => {
    console.log("......options.......", options);
    player = window.videojs(videoRef.current!, {
      ...initialOptions,
      controls: true,
      autoplay: true,
    });
    window.player = player;
    setVideoNode(videoRef);

    player.eme();
    player.src(options);
    bindEvents();

    return () => {
      if (player) {
        player.dispose();
        setVideoNode("");
        window.player = null;
      }
    };
  }, [options?.src]);

  const bindEvents = () => {
    player.on("play", () => {
      setPlayerControlData((prevState: any) => ({
        ...prevState,
        playPauseState: "play",
      }));
    });

    player.on("pause", () => {
      setPlayerControlData((prevState: any) => ({
        ...prevState,
        playPauseState: "pause",
      }));
    });
    player.on("loadeddata", () => {
      setIsLoading(false);
    });

    player.on("seeking", () => {
      setIsLoading(true);
    });
  };

  React.useEffect(() => {
    if (playerControlData.playPauseState === "play") {
      videoRef!.current!.play();
    } else {
      videoRef!.current!.pause();
    }
  }, [playerControlData.playPauseState]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-tech"></video>
    </div>
  );
};

export default VideoJSPlayer;
