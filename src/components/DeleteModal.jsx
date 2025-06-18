import { useRef, useEffect } from "react";
import { deleteLeads } from "../services/operations/leadAPI";
import { deleteEmployee } from "../services/operations/employeeAPI";

const DeleteModal = ({ isOpen, onClose, data, onDeleted, type }) => {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);


    const handleDelete = async () => {
        if (type === "leads") {
            const res = await deleteLeads(data._id);
            if (res?.success) {
                onDeleted();
            }
        }
        else {
            const res = await deleteEmployee(data._id);
            if (res?.success) {
                onDeleted();
            }
        }
    }


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div ref={modalRef} className="bg-white p-6 rounded shadow-md w-[400px]">
                <h2 className="text-xl font-semibold mb-4 text-red-600">Confirm Deletion</h2>
                <p className="mb-4">Are you sure you want to delete <strong>{data?.email}</strong>?</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-[#FF3A3A] text-white  hover:scale-105 px-4 py-2 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
