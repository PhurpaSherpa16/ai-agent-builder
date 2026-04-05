import React from 'react'

export default function ConfirmationModal({title, message, handleConfirm, handleCancel}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl p-6 shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{title}</h3>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end gap-4">
                <button onClick={handleCancel} className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Cancel</button>
                <button onClick={handleConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">Confirm</button>
            </div>
        </div>
    </div>
  )
}
