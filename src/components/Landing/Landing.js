import React, { useEffect, useState } from "react";
import Subscribe from "../Subscribe/Subscribe";
import { useScrollTrigger } from "@material-ui/core";
import ImageFlip from "./ImageFlip/ImageFlip";

const Landing = props => {
  return (
    <div>
      Landing
      <section>
        <ImageFlip />
        <Subscribe />
      </section>
    </div>
  );
};

export default Landing;
