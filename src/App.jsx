import styles from "./App.module.css";
import Frame from "./components/Frame/Frame";

function App() {
  let frames = [];
  for (let i = 1; i <= 9; i++) {
    frames.push(<Frame key={i} />);
  }

  return (
    <div className={styles.App}>
      <div className={styles.frames}>{frames}</div>
    </div>
  );
}

export default App;
