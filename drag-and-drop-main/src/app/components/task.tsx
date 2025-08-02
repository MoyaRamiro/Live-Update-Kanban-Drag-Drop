import { CardType } from "../types/cardType";

interface TaskProps {
  task: CardType;
  handleRemoveTask: (taskId: string) => void;
}

export function Task({ task, handleRemoveTask }: TaskProps) {
  return (
    <li
      key={task.id}
      className=" text-black bg-gray-100 rounded px-3 py-2 shadow hover:bg-gray-200 cursor-pointer transition flex justify-between"
    >
      {task.name}
      <button
        id="no-drag"
        className="text-red px-3 py-2 rounded-md cursor-pointer"
        onClick={() => {
          handleRemoveTask(task.id);
        }}
      >
        <svg className="w-3 h-3 text-gray-600 hover:text-red-500 transition-colors">
          <use href="icons.svg#cross" />
        </svg>
      </button>
    </li>
  );
}
