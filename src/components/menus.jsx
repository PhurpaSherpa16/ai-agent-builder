import { EllipsisVertical } from "lucide-react";
import { useState } from "react";
import ConfirmationModal from "./confirmation_modal";

export default function Menus({isSelected, setIsSelected, item, handleView, handleEdit, handleDelete}) {
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
    return (
        <div className="absolute right-4 top-4 ">
            <button onClick={() => setIsSelected(isSelected === item.id ? null : item.id)}
            className={`relative p-2 rounded-full transition-all duration-200 z-10 ${
                isSelected === item.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
                <EllipsisVertical size={18} />
            </button>
            {
            isSelected === item.id 
            &&
            <div className='absolute right-0 top-10 bg-white border border-gray-200 rounded'>
                <button onClick={() => {
                    handleView(item)
                }} className='menuList text-left pl-4' title="View Details">
                    View
                </button>
                <button onClick={() => {
                    console.log('from edit button:', item)
                    setIsSelected(null)
                    handleEdit(item)
                }} className='menuList text-left pl-4'
                title="Edit Agent">
                    Edit
                </button>
                <button onClick={() => {
                    setIsSelected(null)
                    setIsDeleteConfirmOpen(true)
                }} className='menuList text-left pl-4' title="Delete Agent">
                    Delete
                </button>
            </div>
            }
            {isDeleteConfirmOpen && (
                <ConfirmationModal title="Delete Agent" message="Are you sure you want to delete this agent?" 
                handleConfirm={() => {handleDelete(item); setIsDeleteConfirmOpen(false)}} 
                handleCancel={() => setIsDeleteConfirmOpen(false)} />
            )}
        </div>
    )
}