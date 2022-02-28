/*global kakao*/
import React, { Component } from "react";
import styled from "styled-components";
const API_KEY = process.env.REACT_APP_API_KEY;

class MapContent extends Component {
  componentDidMount() {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        let container = document.getElementById("Mymap");
        let options = {
          center: new kakao.maps.LatLng(37.506502, 127.053617),
          level: 7
        };
  
        const map = new window.kakao.maps.Map(container, options);
     
      });
    };
  }
  //const MapContents = styled.div`width: 100%;height: 100%;`;

  render() {
    return <MapContents id="Mymap"></MapContents>;
  }
}

const MapContents = styled.div`
  width: 100%;
  height: 100%;
`;

export default MapContent;