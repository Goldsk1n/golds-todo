import PageTitle from "./components/PageTitle/PageTitle";
import Controls from "./components/Controls/Controls";
import TodoList from "./components/TodoList/TodoList";
import { Toaster } from "react-hot-toast";
import ThemeToggle from "./components/ThemeToggle/ThemeToggle";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "./slices/todoSlice";

function App() {
    const initialTheme = useSelector(state => state.todo.theme);
    console.log(initialTheme);
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(initialTheme);

    const handleThemeToggle = () => {
        const newTheme = (theme === "light") ? "dark" : "light";
        setTheme(newTheme);
        dispatch(toggleTheme(newTheme));
    }

    return (
        <div className="container" data-theme={theme}>
            <ThemeToggle handleToggle={handleThemeToggle} isChecked={theme === "dark"}/>
            <PageTitle>Todo list</PageTitle>
            <div className="app-wrapper">
                <Controls />
                <TodoList />
            </div>
            <Toaster
                toastOptions={{
                    position: "bottom-right",
                    style: {
                        fontSize: "1.6rem",
                    },
                }}
            />
        </div>
    );
}

export default App;
