import { useSelector } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";
import { AnimatePresence, motion } from "framer-motion";

const listVariants = {
    hidden: { opacity: 1 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const itemVariants = {
    hidden: {
        y: 20,
        opacity: 0,
    },
    visible: {
        y: 0,
        scale: 1,
    },
};

function TodoList() {
    const todoList = useSelector((state) => state.todo.todoList);
    const filterStatus = useSelector((state) => state.todo.filterStatus);

    const sortedTodoList = [...todoList].sort(
        (a, b) => new Date(a.time) - new Date(b.time)
    );

    const filteredTodoList = sortedTodoList.filter((item) => {
        if (filterStatus === "all") {
            return true;
        } else {
            return item.status === filterStatus;
        }
    });

    return (
        <motion.ul
            className="todo-list"
            variants={listVariants}
            initial="hidden"
            animate="visible"
        >
            <AnimatePresence>
                {filteredTodoList && filteredTodoList.length > 0 ? (
                    filteredTodoList.map((item) => (
                        <TodoItem key={item.id} todo={item}></TodoItem>
                    ))
                ) : (
                    <motion.p className="empty-text" variants={itemVariants}>
                        No Todos
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.ul>
    );
}

export default TodoList;
