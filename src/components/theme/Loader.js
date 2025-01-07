import React from "react";
import { ClipLoader } from "react-spinners";

export const Loader = ({ size = 50 }) => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClipLoader color="#6b0808" size={size} />
    </div>
  );
};
