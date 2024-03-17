import { useState, useEffect } from "react";
import Button from "../Button/Button";
import Select from "../Select/Select";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { updateFilterStatus, updateSortStatus } from "../../slices/todoSlice";
import { useSelector } from "react-redux";

function Controls() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [width, setWidth] = useState(0);
    const filterStatus = useSelector((state) => state.todo.filterStatus);
    const sortStatus = useSelector((state) => state.todo.sortStatus);

    const handleAddItemButton = () => {
        setIsModalOpen(true);
    };

    const handleSort = (e) => {
        dispatch(updateSortStatus(e.target.value));
    };

    const handleFilter = (e) => {
        dispatch(updateFilterStatus(e.target.value));
    };

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [width]);

    return (
        <div className="app-header">
            <Button variant="primary" onClick={handleAddItemButton}>
                {width > 400 ? "Add Item" : "+"}
            </Button>
            <div className="select-group">
                <Select
                    id="sort-type"
                    labelText="Sort by"
                    onChange={handleSort}
                    value={sortStatus}
                >
                    <option value="default">Default</option>
                    <option value="priority">Priority</option>
                    <option value="due-date">Due date</option>
                </Select>
                <Select
                    onChange={handleFilter}
                    value={filterStatus}
                    id="filter-type"
                    labelText="Filter by"
                >
                    <option value="all">All</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Completed</option>
                </Select>
            </div>
            <Modal
                type="add"
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
}

export default Controls;
