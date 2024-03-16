import styles from "./Select.module.css";

function Select({ children, id, labelText, ...props }) {
    return (
        <div className={styles.selectContainer}>
            <label htmlFor={id} className={styles.label}>
                {labelText}
            </label>
            <select className={styles.select} id={id} {...props}>
                {children}
            </select>
        </div>
    );
}

export default Select;
