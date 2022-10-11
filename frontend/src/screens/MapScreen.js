import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "./Store";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const defaultLocation = { lat: 40.712, lng: 74.006 };
const libs = ["places"];

export default function MapScreen() {
  const { state, dispatch: ctxDispach } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const [googleAPiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation OS not supported by this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios("/api/keys/google", {
        headers: { Authorization: `BEARER ${userInfo.token}` },
      });
      setGoogleApiKey(data.key);
      getUserCurrentLocation();
    };
    fetch();
    ctxDispach({ type: "SET_FULLBOX_ON" });
  }, [ctxDispach, userInfo]);
  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onConfirm = () => {
    const places = placeRef.current.getPlaces() || [{}];
    console.log(places[0]);
    ctxDispach({
      type: "SAVE_SHIPPING_ADDRESS_MAP_LOCATION",
      payload: {
        lat: location.lat,
        lng: location.lng,
        address: places[0].formatted_address,
        name: places[0].name,
        vicinity: places[0].vicinity,
        googleAddressId: places[0].id,
      },
    });
    toast.success("location selected successfully");
    navigate("/shipping");
  };

  return (
    <div className="full-box">
      <LoadScript libraries={libs} googleMapsApiKey={googleAPiKey}>
        <GoogleMap
          id="smaple-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <input type="text" placeholder="Enter your address"></input>
              <Button type="buttom" onClick={onConfirm} className="cusButton">
                Confirm
              </Button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
