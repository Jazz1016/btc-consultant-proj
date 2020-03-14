import React, { useEffect, useState } from "react";
import "./ImageFlip.scss";
import img1 from "./assets/image1.jpg";
import img2 from "./assets/image2.jpg";
import img3 from "./assets/image3.jpg";
import img4 from "./assets/image4.jpg";
import img5 from "./assets/image5.jpg";
import { Link } from "react-router-dom";

const ImageFlip = props => {
  const text1 = "Have complete control over your money",
    text2 = "Get industry insights from a leading expert",
    text3 = "Live the good life!",
    text4 = "Claim your monetary sovereignty";
  const imgArr = [img1, img2, img3, img4, img5];
  const textArr = [text1, text2, text3, text4];
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(
      () => setImgIndex(Math.floor(Math.random() * (imgArr.length - 1))),
      5000
    );
    return () => {
      return clearInterval(interval);
    };
  });
  return (
    <div
      className="image-flipper"
      style={{
        backgroundImage: `url(${imgArr[imgIndex]})`,
        transition: "1s"
      }}
    >
      <section className="img-flip-text-box">
        <p>{textArr[imgIndex]}</p>
      </section>
      <section className="main-btn">
        <Link to="/newsletter">View Newsletter ></Link>
      </section>
    </div>
  );
};

export default ImageFlip;
