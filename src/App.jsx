import styles from "./App.module.css";
import { useState } from "react";

function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  const sound = new Audio("/ae.mp3");

  const frameClicked = (frame) => {
    console.log("click");
    setIsAnimating(true);
    sound.play();
  };

  const animationEnded = (frame) => {
    console.log("end");
    setIsAnimating(false);
  };

  return (
    <div className={styles.App}>
      <div
        onClick={frameClicked}
        onAnimationEnd={animationEnded}
        className={`${styles.imageFrame} ${
          isAnimating ? styles.animating : ""
        }`}
      ></div>
    </div>
  );
}

export default App;
