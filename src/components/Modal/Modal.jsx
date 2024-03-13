import { useState } from "react";
import styles from "./Modal.module.css";
import Button from "../Button/Button";
import Select from "../Select/Select";
import { useDispatch } from "react-redux";
import { addTodo } from "../../slices/todoSlice";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { updateTodo } from "../../slices/todoSlice";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const dropIn = {
    hidden: {
        opacity: 0,
        transform: "scale(0.9)",
    },
    visible: {
        transform: "scale(1)",
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
        },
    },
    exit: {
        transform: "scale(0.9)",
        opacity: 0,
    },
};

function Modal({ type, isModalOpen, setIsModalOpen, todo }) {
    const [title, setTitle] = useState("");
    const [status, setStatus] = useState("incomplete");
    const dispatch = useDispatch();

    useEffect(() => {
        if (type === "update" && todo) {
            setTitle(todo.title);
            setStatus(todo.status);
        } else {
            setTitle("");
            setStatus("incomplete");
        }
    }, [type, todo, isModalOpen]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        console.log(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === "") {
            toast.error("Title shouldn't be empty");
        }
        if (title && status) {
            if (type === "add") {
                dispatch(
                    addTodo({
                        id: uuid(),
                        title,
                        status,
                        time: new Date().toLocaleString(),
                    })
                );
                toast.success("Task Added Successfully");
            }
            if (type === "update") {
                dispatch(updateTodo({ ...todo, title, status }));
                toast.success("Task Updated Successfully");
            }
            closeModal();
        }
    };

    return (
        <AnimatePresence>
            {isModalOpen && (
                <motion.div
                    className={styles.wrapper}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <motion.div
                        className={styles.container}
                        variants={dropIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <h2 className={styles.formTitle}>
                                {type === "add" ? "Add" : "Update"} Task
                            </h2>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                    autoFocus
                                />
                            </label>
                            <label htmlFor="status">
                                Status
                                <Select
                                    id="status"
                                    onChange={handleStatusChange}
                                    value={status}
                                >
                                    <option value="incomplete">
                                        Incomplete
                                    </option>
                                    <option value="complete">Completed</option>
                                </Select>
                            </label>
                            <div className={styles.buttonContainer}>
                                <Button variant="primary" type="submit">
                                    {type === "add" ? "Add" : "Update"} item
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Modal;
