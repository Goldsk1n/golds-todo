import PageTitle from "./components/PageTitle/PageTitle";
import Controls from './components/Controls/Controls';
import TodoList from "./components/TodoList/TodoList";
import {Toaster} from "react-hot-toast";

function App() {
    return (
        <>
            <PageTitle>Todo list</PageTitle>
            <div className="app-wrapper">
                <Controls/>
                <TodoList/>
            </div>
            <Toaster toastOptions={{
                position: "bottom-right",
                style: {
                    fontSize: '1.6rem'
                }
            }}/>
        </>
    );
}

export default App;
