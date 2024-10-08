import styles from "./App.module.css";
import Frame from "/src/components/Frame/Frame";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "/src/firebase";
import Nav from "./components/Nav/Nav";

function App() {
  const [user, loading, error] = useAuthState(auth);

  let frames = [];
  const frameCount = 1;
  for (let i = 1; i <= frameCount; i++) {
    frames.push(<Frame key={i} />);
  }

  return (
    <div className={styles.App}>
      <h1>DEPLOY TEST</h1>
      {/* <div className={styles.navPane}>{user && <Nav />}</div>
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
      </div> */}
    </div>
  );
}

export default App;
