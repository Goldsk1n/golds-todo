import styles from "./ThemeToggle.module.css";

function ThemeToggle({ handleToggle, isChecked }) {
    return (
        <div className={styles.container}>
            <input
                type="checkbox"
                id="theme-toggle"
                className={styles.toggle}
                onChange={handleToggle}
                checked={isChecked}
            />
            <label htmlFor="theme-toggle">Dark Mode</label>
        </div>
    );
}

export default ThemeToggle;
