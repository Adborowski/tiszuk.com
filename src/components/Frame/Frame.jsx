import styles from "../../App.module.css";
import { useState } from "react";

const Frame = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  const sound = new Audio("/ae.mp3");

  const frameClicked = (frame) => {
    setIsAnimating(true);
    sound.play();
  };

  const animationEnded = (frame) => {
    setIsAnimating(false);
  };

  return (
    <div
      onClick={frameClicked}
      onAnimationEnd={animationEnded}
      className={`${styles.Frame} ${isAnimating ? styles.animating : ""}`}
    ></div>
  );
};

export default Frame;
