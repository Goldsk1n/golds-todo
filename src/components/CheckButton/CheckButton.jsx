import styles from "./CheckButton.module.css";
import { motion, useMotionValue, useTransform } from "framer-motion";

const checkVariants = {
    initial: {
        color: "#FFF",
    },
    checked: {
        pathLength: 1,
    },
    unchecked: {
        pathLength: 0,
    },
};

const boxVariants = {
    checked: {
        outlineWidth: 0,
        background: "var(--primaryOrange)",
        transition: { duration: 0.1 },
    },
    unchecked: {
        outlineWidth: "1px",
        background: "var(--gray-1)",
        transition: { duration: 0.1 },
    },
};

function CheckButton({ isChecked, handleCheck, priority }) {
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    return (
        <motion.div
            className={`${styles.svgBox} ${isChecked ? "checked" : "unchecked"} ${priority}`}
            variants={boxVariants}
            animate={isChecked ? "checked" : "unchecked"}
            onClick={handleCheck}
        >
            <motion.svg
                className={styles.svg}
                viewBox="0 0 53 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.path
                    variants={checkVariants}
                    animate={isChecked ? "checked" : "unchecked"}
                    style={{pathLength, opacity}}
                    fill="none"
                    strokeMiterlimit="10"
                    strokeWidth="6"
                    d="M1.5 22L16 36.5L51.5 1"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                ></motion.path>
            </motion.svg>
        </motion.div>
    );
}

export default CheckButton;
