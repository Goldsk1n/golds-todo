import { createSlice } from "@reduxjs/toolkit";

const getInitialTodo = () => {
    const todoList = window.localStorage.getItem("todoList");
    if (todoList) {
        return JSON.parse(todoList);
    } else {
        const emptyList = [];
        window.localStorage.setItem("todoList", JSON.stringify(emptyList));
        return emptyList;
    }
};

const initialState = {
    filterStatus: "all",
    todoList: getInitialTodo(),
};

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload);
            const todoList = window.localStorage.getItem("todoList");
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.push({
                    ...action.payload,
                });
                window.localStorage.setItem(
                    "todoList",
                    JSON.stringify(todoListArr)
                );
            } else {
                window.localStorage.setItem("todoList", [
                    { ...action.payload },
                ]);
            }
        },
        deleteTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if(todo.id === action.payload) {
                        todoListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if(todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo) => {
                    if(todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.status = action.payload.status;
                    }
                });
                window.localStorage.setItem("todoList", JSON.stringify(todoListArr));
                state.todoList = todoListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        }
    },
});

export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;
