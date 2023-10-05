import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { platformTvKeysMeth } from "../../constants/tvKey";
import { ROUTES } from "../../constants/routeConstant";
import VideoIcon from "../../assets/images/VideoIcon.svg";
import Icon from "../../assets/images/played.svg";
import player from"../../assets/images/icons8-video-24.png";

const SplashPage = () => {
  const btnRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    btnRef.current && btnRef.current!.focus();
  }, []);

  const buttonClick = (event: any) => {
    navigate(ROUTES.HOME);
  };

  const getStartedHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();

    const element = e.target as HTMLElement;
    switch (e.keyCode) {
      case keys.KEY_ENTER:
        buttonClick(e);
        break;

      default:
    }
  };

  const onFocus = (event: any) => {
    event.preventDefault();
    let currentElement = event.target;
    if (currentElement) {
      [...currentElement.parentElement.children].forEach((el) =>
        el.classList.remove("focus")
      );
      currentElement?.classList.add("focus");
    }
  };

  return (
    <div className="splash-page">
      
      <div className="content">
        <div className="headline">
          <p>VIDE</p><img className ="headlineimg"src={Icon}/><p>JS   PLAY</p><img className ="headlineplayerimg"src={player}/><p>R</p></div>
          <img
          className="videoplayer-icon"
          src={VideoIcon}
          alt="videoplayer-icon"
        />
        <div
          className="get-started-button"
          tabIndex={0}
          ref={btnRef}
          onClick={(e: any) => buttonClick(e)}
          onFocus={(e: any) => onFocus(e)}
          onKeyDown={(e: any) => getStartedHandler(e)}
        >
          <span className="text-get-started">Video Player</span>
        </div>

       
      </div>
    </div>
  );
};

export default SplashPage;
