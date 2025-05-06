import React from "react";
import bannerImage from "../../public/banner.png";
import { SharedButton } from "../styledComponents/styledComponents";
import { InfoCircleFill } from "react-bootstrap-icons";
export default function Banner() {
  return (
    <div className="banner text-white position-relative mb-4">
      <img
        src={bannerImage}
        alt="Moonfall"
        className="img-fluid w-100 rounded"
      />
      <div className="position-absolute bottom-0 end-0 p-3">
        <SharedButton className="btn  me-2">▶ Play</SharedButton>
        <SharedButton className="btn  me-2">
          <InfoCircleFill className="me-2" /> More Info
        </SharedButton>
      </div>
    </div>
  );
}
