import styles from "./Nav.module.css";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className={styles.Nav}>
      <NavLink className={`${styles.NavLink}`} to="/">
        <span>Home</span>
      </NavLink>
      <NavLink className={styles.NavLink} to="/twitszuk">
        <span>Twitszuk</span>
      </NavLink>
    </div>
  );
};

export default Nav;
