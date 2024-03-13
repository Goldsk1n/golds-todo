import styles from "./Select.module.css";

function Select({children, ...props}) {
    return (
        <select className={styles.select} {...props}>
            {children}
        </select>
    );
}

export default Select;
