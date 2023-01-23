import styles from "./styles.module.scss";

export function NavbarElement({ label, icon }) {
  return (
    <li className={styles.main}>
      <div>{icon}</div>
      <span> {label} </span>
    </li>
  );
}
