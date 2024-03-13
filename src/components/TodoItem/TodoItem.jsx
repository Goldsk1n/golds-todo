import styles from "./TodoItem.module.css";
import { MdDelete, MdEdit } from "react-icons/md";
import { deleteTodo, updateTodo } from "../../slices/todoSlice";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CheckButton from "../CheckButton/CheckButton";
import { motion } from "framer-motion";

const itemVariants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        opacity: 1,
    },
};

function TodoItem({ todo }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        if (todo.status === "complete") {
            setIsChecked(true);
        } else {
            setIsChecked(false);
        }
    }, [todo.status]);

    const handleCheck = () => {
        setIsChecked(!isChecked);
        dispatch(
            updateTodo({
                ...todo,
                status: isChecked ? "incomplete" : "complete",
            })
        );
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
        toast.success("Task deleted successfully");
    };

    const handleEdit = () => {
        setIsModalOpen(true);
    };

    return (
        <>
            <motion.li className={styles.item} variants={itemVariants}>
                <div className={styles.todoDetails}>
                    <CheckButton
                        isChecked={isChecked}
                        handleCheck={handleCheck}
                    />
                    <div className={styles.texts}>
                        <p
                            className={`${styles.todoText} ${
                                todo.status === "complete" && styles.completed
                            }`}
                        >
                            {todo.title}
                        </p>
                        <div className={styles.time}>{todo.time}</div>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div
                        className={styles.icon}
                        onClick={handleDelete}
                        role="button"
                        tabIndex={0}
                    >
                        <MdDelete />
                    </div>
                    <div
                        className={styles.icon}
                        onClick={handleEdit}
                        role="button"
                        tabIndex={0}
                    >
                        <MdEdit />
                    </div>
                </div>
            </motion.li>
            <Modal
                type="update"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                todo={todo}
            />
        </>
    );
}

export default TodoItem;
