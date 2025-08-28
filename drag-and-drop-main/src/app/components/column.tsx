"use client";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { CardType } from "../types/cardType";
import { Task } from "./task";
import { TaskForm } from "./taskForm";
import { SocketData } from "./socketData";
import { useEffect } from "react";

interface ColumnProps {
  title: string;
  cards: CardType[];
  id: string;
  handleRemoveColumn: (columnId: string) => void;
  handleRemoveTask: (
    taskId: string,
    setTasks: (data: CardType[]) => void
  ) => void;
  handleAddTask: (
    newName: string,
    setTasks: (data: CardType[]) => void
  ) => void;
  registerTasksSetter: (columnId: string, setTasks: (data: CardType[]) => void) => void;
}

export function Column({
  title,
  cards,
  id,
  handleRemoveColumn,
  handleRemoveTask,
  handleAddTask,
  registerTasksSetter,
}: ColumnProps) {
  const [taskList, tasks, setTasks] = useDragAndDrop<
    HTMLUListElement,
    CardType
  >(cards, {
    group: "cards",
    draggable: (el) => {
      return el.id !== "no-drag";
    },
  });

  useEffect(() => {
    const cleanup = registerTasksSetter(id, setTasks);
    return cleanup;
  }, [id, registerTasksSetter]);

  return (
    <ul
      className="bg-white rounded-lg shadow-md p-4 w-72 flex flex-col gap-2"
      ref={taskList}
    >
      <div id="no-drag" className="flex items-center justify-between pb-3">
        <h2 className="text-black break-all opacity-90 text-2xl font-bold">
          {title}
        </h2>
        <button
          id="no-drag"
          className="text-red px-3 py-2 rounded-md cursor-pointer"
          onClick={() => {
            handleRemoveColumn(id);
          }}
        >
          <svg className="w-3 h-3 text-gray-700 hover:text-black">
            <use href="icons.svg#cross" />
          </svg>
        </button>
      </div>

      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          handleRemoveTask={(taskId) => handleRemoveTask(taskId, setTasks)}
        />
      ))}
      <TaskForm
        columnId={id}
        handleAddTask={(newName) => handleAddTask(newName, setTasks)}
      />
    </ul>
  );
}
