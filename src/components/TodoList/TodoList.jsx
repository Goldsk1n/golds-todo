import { useSelector } from "react-redux";
import TodoItem from "../TodoItem/TodoItem";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { changeOrder } from "../../slices/todoSlice";
import { useState } from "react";

function TodoList() {
    const todoList = useSelector((state) => state.todo.todoList);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const sortStatus = useSelector((state) => state.todo.sortStatus);
    
    const [isDragging, setIsDragging] = useState(false);

    const dispatch = useDispatch();

    const handleDragStart = () => {
        setIsDragging(true);
    }

    const handleDragEnd = (result) => {
        setIsDragging(false);
        
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        dispatch(
            changeOrder({
                destination: destination.index,
                source: source.index,
            })
        );
    };

    const priorityValue = {"low": 0, "medium": 1, "high": 2};

    const sortedTodoList = [...todoList].sort((a, b) => {
        if (sortStatus === "priority") {
            return priorityValue[b.priority] - priorityValue[a.priority];
        } else if (sortStatus === "due-date") {
            return new Date(a.dueDate) - new Date(b.dueDate);
        }
    });

    const filteredTodoList = sortedTodoList.filter((item) => {
        if (filterStatus === "all") {
            return true;
        } else {
            return item.status === filterStatus;
        }
    });

    return (
        <DragDropContext
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <Droppable droppableId="drop-list">
                {(provided) => (
                    <ul
                        ref={provided.innerRef}
                        className="todo-list"
                        {...provided.droppableProps}
                        style={{paddingBottom: isDragging && "92px"}}
                    >
                        {/* {provided.placeholder} */}
                        {filteredTodoList && filteredTodoList.length > 0 ? (
                            filteredTodoList.map((item, index) => (
                                <TodoItem
                                    key={item.id}
                                    todo={item}
                                    index={index}
                                />
                            ))
                        ) : (
                            <p className="empty-text">No Todos</p>
                        )}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default TodoList;
