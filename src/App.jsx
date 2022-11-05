import styles from "./App.module.css";
import Frame from "./components/Frame/Frame";

function App() {
  // const firebase = firebase;
  let frames = [];
  const frameCount = 1;
  for (let i = 1; i <= frameCount; i++) {
    frames.push(<Frame key={i} />);
  }

  return (
    <div className={styles.App}>
      <div className={styles.graphics}>
        <div className={styles.rings}>
          <div className={styles.ring}></div>
        </div>

        <div className={styles.rings}>
          <div className={styles.ring}></div>
        </div>

        <div className={styles.rings}>
          <div className={styles.ring}></div>
        </div>
        <div className={styles.frames}>{frames}</div>
      </div>
    </div>
  );
}

export default App;
