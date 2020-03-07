import React, { useEffect, useState } from "react";
import "./ImageFlip.css";
import img1 from "./assets/image1.jpg";
import img2 from "./assets/image2.jpg";
import img3 from "./assets/image3.jpg";
import img4 from "./assets/image4.jpg";
import img5 from "./assets/image5.jpg";

const ImageFlip = props => {
  const text1 = "asdfas",
    text2 = "fasdfas",
    text3 = "akfhdas",
    text4 = "asdfkashbdf";
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
      <p>Take what is rightfully yours!</p>
    </div>
  );
};

export default ImageFlip;
