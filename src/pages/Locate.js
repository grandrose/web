import React, { useState } from "react";
import gradiant from "../assets/backgrounds/gr-core-gradient.png";
import { StoreCard } from "../components/theme";
import { GoogleMap, LoadScript } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "80.5vh",
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ saturation: -100 }, { lightness: 50 }],
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ saturation: -100 }, { lightness: 20 }],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ visibility: "off" }],
  },
];

const center = {
  lat: 37.7749, // TODO - Pick default center
  lng: -122.4194,
};

export const Locate = () => {
  const [selected, setSelected] = useState("");
  const mapRadius = 30 / 0.6213;
  let zoomLevel = Math.log2(40000 / (mapRadius / 2));

  const sectionStyles = {
    backgroundImage: `url(${gradiant})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div style={sectionStyles}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <div className="flex h-screen px-32">
          <div className="w-1/4 text-cream p-6">
            <h2 className="text-3xl font-semibold mb-4 flex justify-center">
              STORE LOCATOR
            </h2>
            <ul className="space-y-4">
              <li
                className={`cursor-pointer ${selected === "temp1" ? "" : ""}`}
                onClick={() => setSelected("temp1")}
              >
                <StoreCard />
              </li>
              <li
                className={`cursor-pointer ${selected === "temp2" ? "" : ""}`}
                onClick={() => setSelected("temp2")}
              >
                <StoreCard />
              </li>
            </ul>
          </div>

          <div className="w-3/4 p-6">
            {/*TODO - get google maps api key */}
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={center}
              zoom={zoomLevel}
              options={{
                styles: mapStyles,
                disableDefaultUI: true,
              }}
            >
              {/* Add any map overlays here */}
            </GoogleMap>
          </div>
        </div>
      </LoadScript>
    </div>
  );
};
