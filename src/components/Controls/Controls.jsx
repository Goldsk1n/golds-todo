import {useState} from "react";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { updateFilterStatus } from "../../slices/todoSlice";
import {useSelector} from "react-redux";

function Controls() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filterStatus = useSelector(state => state.todo.filterStatus);

    const handleAddItemButton = () => {
        setIsModalOpen(true);
    }

    const handleFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value));
    }

    return (
        <div className="app-header">
            <Button variant="primary" onClick={handleAddItemButton}>Add Item</Button>
            <Select onChange={handleFilter} value={filterStatus}>
                <option value="all">All</option>
                <option value="incomplete">Incomplete</option>
                <option value="complete">Completed</option>
            </Select>
            <Modal type="add" isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    );
}

export default Controls;
