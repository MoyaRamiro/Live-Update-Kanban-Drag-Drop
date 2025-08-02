import { useState } from "react";

interface TaskFormProps {
  columnId: string;
  handleAddTask: (newName: string) => void;
}

export function TaskForm({ columnId, handleAddTask }: TaskFormProps) {
  const [newName, setNewName] = useState("");

  return (
    <div id="no-drag">
      <label
        htmlFor={columnId}
        className="text-gray-400  rounded-lg w-fit dark:text-gray-500 cursor-pointer"
      >
        <div className="flex items-center w-full p-2 max-w-xs text-gray-300  rounded-xl hover:bg-gray-300">
          <input type="checkbox" id={columnId} className="hidden peer" />

          <svg className="w-6 h-6 mr-1.5 items-center peer-checked:hidden text-gray-700 hover:text-gray-900">
            <use href="icons.svg#add" />
          </svg>

          <label
            htmlFor={columnId}
            className="mr-1.5 text-gray-400 hover:text-gray-900 rounded-lg p-1.5 w-fit h-8 dark:text-gray-500 focus:text-black cursor-pointer hidden peer-checked:block"
          >
            <svg className="w-4 h-4 items-center">
              <use href="icons.svg#cross" />
            </svg>
          </label>

          <span className="w-fit mt-2 peer-checked:hidden text-black cursor-pointer">
            Añadir tarjeta...
          </span>

          <div className="flex-col w-full hidden peer-checked:flex">
            <form>
              <textarea
                className="p-5 resize-none border-gray-700 border-2 w-full bg-transparent text-black focus:outline-none overflow-hidden px-5 pt-1 rounded-lg min-h-16"
                rows={2}
                value={newName || ""}
                placeholder="Escribe el título de la tarjeta..."
                onChange={(e) => setNewName(e.target.value)}
                ref={(el) => {
                  if (el) {
                    el.style.height = "auto";
                    el.style.height = `${el.scrollHeight}px`;
                  }
                }}
              />
              <div className="flex justify-end w-full">
                <label
                  className="mr-5 rounded-lg bg-transparent text-black cursor-pointer hover:bg-gray-200 w-fit p-2"
                  htmlFor={columnId}
                  onClick={() => {
                    handleAddTask(newName);
                    setNewName("");
                  }}
                >
                  Añadir
                </label>
              </div>
            </form>
          </div>
        </div>
      </label>
    </div>
  );
}
