import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import { platformTvKeysMeth } from "../../constants/tvKey";
import { ROUTES } from "../../constants/routeConstant";
import { useDispatch } from "react-redux";
import Playicon from "../../assets/images/Widgeticon.png"
import {
  PlayBackUrl,
  ContentFormat,
  ContentName,
  DRMcontentURL,
} from "../../slices/player-slice";

const MovieBlock: React.FC<any> = (props) => {
  const { data } = props;
  const divRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const attributes: {
    ref: React.Ref<HTMLDivElement>;
  } = {
    ref: null,
  };
  if (!props?.fromDrm && props?.index === 0) {
    attributes.ref = divRef;
    useEffect(() => {
      divRef.current && divRef.current!.focus();
    }, []);
  }

  const onClick = () => {
    dispatch(PlayBackUrl(data?.playback_url));
    dispatch(ContentFormat(data?.format));
    dispatch(ContentName(data?.content_name));
    dispatch(DRMcontentURL(data))
    navigate(ROUTES.PLAYER);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const keys = platformTvKeysMeth();

    const element = e.target as HTMLElement;
    switch (e.keyCode) {
      case keys.KEY_RETURN:
      case keys.KEY_BACK:
        history.back();
        break;

      case keys.KEY_UP:
        if (props?.fromDrm) {
          if (element?.classList?.contains("focus")) {
            element?.classList?.remove("focus");
          }
          const ele =
            element?.parentElement?.parentElement?.children?.[1].firstChild;

          if (ele) {
            ele && (ele as HTMLElement)?.focus();
          }
        }
        break;

      case keys.KEY_DOWN:
        if (!props?.fromDrm) {
          if (element?.classList?.contains("focus")) {
            element?.classList?.remove("focus");
          }
          const ele =
            element?.parentElement?.parentElement?.children?.[3].firstChild;

          if (ele) {
            ele && (ele as HTMLElement)?.focus();
          }
        }
        break;

      case keys.KEY_RIGHT:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.nextSibling && (element?.nextSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_LEFT:
        if (element?.classList?.contains("focus")) {
          element?.classList?.remove("focus");
        }
        element?.previousSibling &&
          (element?.previousSibling as HTMLElement)?.focus();
        break;

      case keys.KEY_ENTER:
        onClick();
        break;

      default:
    }
  };

  return (
    <div
      key={props?.index}
      className="movie-block"
      onKeyDown={(e: any) => handleKeyDown(e)}
      onClick={onClick}
      onFocus={(e: any) => onFocus(e)}
      tabIndex={0}
      {...attributes}
    >
      <img className="poster" src={data?.poster_url} alt="Movie Poster" />
      <div className="play-button">
        <img
          src={Playicon}
          alt="Play Button"
        />
      </div>
    </div>
  );
};

export default MovieBlock;
