import styles from "./Button.module.css";

function Button({ children, variant, type, ...rest }) {
    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            type={type === "submit" ? "submit" : "button"}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
