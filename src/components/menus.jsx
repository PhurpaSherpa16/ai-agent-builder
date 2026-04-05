import { EllipsisVertical } from "lucide-react";

export default function Menus({isSelected, setIsSelected, index, handleView, handleEdit, handleDelete}) {
    return (
        <div className="absolute right-4 top-4 ">
            <button onClick={() => setIsSelected(isSelected === index ? null : index)}
            className={`relative p-2 rounded-full transition-all duration-200 z-10 ${
                isSelected === index 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600'
            }`}>
                <EllipsisVertical size={18} />
            </button>
            {
            isSelected === index 
            &&
            <div className='absolute right-0 top-10 bg-white border border-gray-200 rounded'>
                <button onClick={() => {
                    handleView(index)
                }} className='menuList text-left pl-4' title="View Details">
                    View
                </button>
                <button onClick={() => {
                    setIsSelected(null)
                    handleEdit(index)
                }} className='menuList text-left pl-4'
                title="Edit Agent">
                    Edit
                </button>
                <button onClick={() => {
                    setIsSelected(null)
                    handleDelete(index)}
                } className='menuList text-left pl-4' title="Delete Agent">
                    Delete
                </button>
            </div>
            }
        </div>
    )
}