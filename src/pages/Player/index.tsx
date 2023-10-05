import React, { useEffect, useState, useRef } from "react";
import "./index.scss";
import VideoJSPlayer from "./videojsPlayer";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import playIcon from "../../assets/images/play.svg";
import pauseIcon from "../../assets/images/pause.svg";
import { platformTvKeysMeth } from "../../constants/tvKey";

const Player: React.FC<any> = (props) => {
  const playPauseRef = useRef<HTMLDivElement>(null);
  const [videoJsOptions, setVideoJsOptions] = React.useState({});
  const [videoNode, setVideoNode] = React.useState<any>();
  const [playerControlData, setPlayerControlData] = useState<any>({
    playPauseState: "play",
  });
  const [isLoading, setIsLoading] = React.useState<any>(true);

  const playBackUrlResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.PlayBackUrlData
  );

  const playBackFormatResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.ContentFormatData
  );

  const contentNameResponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.ContentNameData
  );

  const drmContentresponse = useSelector<RootState, any>(
    (state: any) => state.videoPlayer.DRMcontentNameData
  );

  console.log(".....playBackUrlResponse....", playBackUrlResponse);

  useEffect(() => {
    if (playPauseRef?.current) {
      playPauseRef.current && playPauseRef.current!.focus();
    }
  }, [videoJsOptions, isLoading]);

  const onClickControl = () => {
    playPauseFunction();
  };

  const playPauseFunction = () => {
    if (playerControlData.playPauseState === "play") {
      videoNode!.current!.pause();
    } else {
      videoNode!.current!.play();
    }
    setPlayerControlData((prevState: any) => ({
      ...playerControlData,
      playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
    }));
  };

  const playFunction = () => {
    if (playerControlData.playPauseState === "pause") {
      videoNode!.current!.play();
      setPlayerControlData((prevState: any) => ({
        ...playerControlData,
        playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
      }));
    }
  };
  const pauseFunction = () => {
    if (playerControlData.playPauseState === "play") {
      videoNode!.current!.pause();
      setPlayerControlData((prevState: any) => ({
        ...playerControlData,
        playPauseState: prevState.playPauseState === "play" ? "pause" : "play",
      }));
    }
  };

  const playerKeyHandler = (e: any) => {
    const keys = platformTvKeysMeth();

    switch (e.keyCode) {
      case keys.KEY_ENTER:
        playPauseFunction();
        break;

      case keys.KEY_PLAY:
        playFunction();
        break;

      case keys.KEY_PAUSE:
        pauseFunction();
        break;

      case keys.KEY_RETURN:
      case keys.KEY_BACK:
      case keys.KEY_STOP:
        history.back();
        break;
    }
  };

  useEffect(() => {
    if (
      
      playBackUrlResponse?.length > 0 && typeof playBackUrlResponse === "string" 
    ) {
      let HLS = playBackUrlResponse?.includes(".m3u8");
      let Dash = playBackFormatResponse?.includes(".mpd");
      let licenseUrl = `https://widevine-proxy.drm.technology/proxy`;

      if (HLS || playBackFormatResponse === "VOD_HLS") {
        if (drmContentresponse) {
          console.log("...drmContentresponse...", drmContentresponse);
          
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/x-mpegURL", // M3U8 format // HLS
              keySystems: {
                "com.widevine.alpha": {
                  url: licenseUrl,
                  licenseHeaders: {
                    "x-vudrm-token": drmContentresponse?.token,
                    kid: drmContentresponse?.kid,
                  },
                },
              },
            });
          
        } else {
          setVideoJsOptions({
            src: playBackUrlResponse,
            type: "application/x-mpegURL", // M3U8 format // HLS
          });
        }
      } else if (Dash || playBackFormatResponse === "VOD_DASH") {
        if (drmContentresponse) {
          console.log("...drmContentresponse...", drmContentresponse);
          
            setVideoJsOptions({
              src: playBackUrlResponse,
              type: "application/dash+xml", // MPD format // DASH
              keySystems: {
                "com.widevine.alpha": {
                  url: licenseUrl,
                  licenseHeaders: {
                    "x-vudrm-token": drmContentresponse?.token,
                    kid: drmContentresponse?.kid,
                  },
                },
              },
            });
        } else {
          setVideoJsOptions({
            src: playBackUrlResponse,
            type: "application/dash+xml", // MPD format // DASH
          });
        }
      } else {
        setVideoJsOptions({
          src: playBackUrlResponse,
          type: "video/mp4", // MP4 format
        });
      }
    }
  }, [playBackUrlResponse]);

  return Object.keys(videoJsOptions)?.length ? (
    <div className="player-container">
      {!isLoading && (
        <div className="player-Heading">
          <span className="player-title">{contentNameResponse}</span>
        </div>
      )}
      <div className="player-main">
        <VideoJSPlayer
          options={videoJsOptions}
          setVideoNode={setVideoNode}
          playerControlData={playerControlData}
          setPlayerControlData={setPlayerControlData}
          setIsLoading={setIsLoading}
        />
      </div>

      {!isLoading && (
        <div className="player-controls">
          <div
            className="play-pause-block"
            ref={playPauseRef}
            tabIndex={0}
            onClick={() => onClickControl()}
            onKeyDown={(e: any) => playerKeyHandler(e)}
          >
            <img
              src={
                playerControlData.playPauseState === "play" ? playIcon : pauseIcon
              }
            />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loader-container">
          <img
            className="loader-image"
            src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
            alt="loader-image"
          />
        </div>
      )}
    </div>
  ) : (
    <div className="loader-container">
      <img
        className="loader-image"
        src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
        alt="loader-image"
      />
    </div>
  );
};

export default Player;