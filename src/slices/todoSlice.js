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

const getInitialTheme = () => {
    return window.localStorage.getItem("theme");
};

const initialState = {
    filterStatus: "all",
    sortStatus: "default",
    todoList: getInitialTodo(),
    theme: getInitialTheme(),
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
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo, index) => {
                    if (todo.id === action.payload) {
                        todoListArr.splice(index, 1);
                    }
                });
                window.localStorage.setItem(
                    "todoList",
                    JSON.stringify(todoListArr)
                );
                state.todoList = todoListArr;
            }
        },
        updateTodo: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            if (todoList) {
                const todoListArr = JSON.parse(todoList);
                todoListArr.forEach((todo) => {
                    if (todo.id === action.payload.id) {
                        todo.title = action.payload.title;
                        todo.status = action.payload.status;
                    }
                });
                window.localStorage.setItem(
                    "todoList",
                    JSON.stringify(todoListArr)
                );
                state.todoList = todoListArr;
            }
        },
        updateFilterStatus: (state, action) => {
            state.filterStatus = action.payload;
        },
        updateSortStatus: (state, action) => {
            state.sortStatus = action.payload;
        },
        changeOrder: (state, action) => {
            const todoList = window.localStorage.getItem("todoList");
            const todoListArr = JSON.parse(todoList);
            const sourceItem = todoListArr.splice(action.payload.source, 1)[0];
            todoListArr.splice(action.payload.destination, 0, sourceItem);
            window.localStorage.setItem(
                "todoList",
                JSON.stringify(todoListArr)
            );
            state.todoList = todoListArr;
        },
        toggleTheme: (state, action) => {
            window.localStorage.setItem("theme", action.payload);
            state.theme = action.payload;
        }
    },
});

export const {
    addTodo,
    deleteTodo,
    updateTodo,
    updateFilterStatus,
    updateSortStatus,
    changeOrder,
    toggleTheme
} = todoSlice.actions;
export default todoSlice.reducer;
