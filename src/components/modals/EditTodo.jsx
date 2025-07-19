import { useState } from "react";

export default function EditTodoModal({ title, id, show, onClose, editeData }) {
  if (!show) return null;
  let [textInput, setTextInput] = useState(title);

  function submit() {
    editeData(id, { title: textInput, complete: false });
    onClose();
  }

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      <div className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 shadow-lg w-96 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Edit: {title}</h2>
        <input
          type="text"
          autoFocus
          className="h-9 border border-gray-300 rounded-sm px-2 focus:outline-none"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyDown={(e) => {
            e.keyCode == 13 ? submit() : null;
          }}
        />

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </button>
      </div>
    </>
  );
}
