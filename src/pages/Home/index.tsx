import React, { useEffect, useRef } from "react";
import "./index.scss";
import WidgetBlock from "../../components/WidgetBlock";
import { nonDrmContentList } from "../../utils/nonDrmContent";
import { drmContentList } from "../../utils/drmContent";
import playIcon from "../../assets/images/icons8-play-button-circled-24.png"

const HomePage: React.FC<any> = (props) => {
  console.log("lets check=---");
  console.warn(console.log);
  return (
    <div className="home-page">

      <div className="Widget-title"> <h1 className="non-drm-content-title content-title">NON-DRM Widget</h1>
     <img  className="Widgetimg"src={playIcon}/></div>
      <div className="non-drm movie-block-container">
        {nonDrmContentList?.map((item: any, index: number) => {
          return (
            <WidgetBlock data={item} key={index} fromDrm={false} index={index} />
          );
        })}
      </div>
      <div className="Widget-title"> <h1 className="drm-content-title content-title">DRM Widget</h1>
     <img  className="Widgetimg"src={playIcon}/></div>
      <div className="drm-content movie-block-container">
        {drmContentList?.map((item: any, index: number) => {
          return (
            <WidgetBlock data={item} key={index} fromDrm={true} index={index} />
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
