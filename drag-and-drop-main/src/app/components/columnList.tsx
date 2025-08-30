import { Column } from "./column";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { ColumnType } from "../types/columnType";
import { SocketData } from "./socketData";
import { CardType } from "../types/cardType";
import { ColumnForm } from "./columnForm";
import { v4 as uuidv4 } from "uuid";

export function ColumnList() {
  const [columnList, columns, setColumns] = useDragAndDrop<
    HTMLUListElement,
    ColumnType
  >([], { group: "column" });
  const {
    updateSocketBoard,
    updateSocketTasks,
    registerTasksSetter,
    fetchAllColumns,
  } = SocketData(setColumns);

  const onAddTask = async (
    newName: string,
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    const columnData = await fetchAllColumns();
    const column = columnData.find((col) => col.id === columnId);
    if (!column) return;

    const updatedColumn = {
      ...column,
      elements: [
        ...column.elements,
        { id: uuidv4(), name: newName, isChecked: false },
      ],
    };

    if (updatedColumn) {
      updateSocketTasks(updatedColumn.elements, columnId, setTasks);
    }
  };

  const onRemoveTask = async (
    taskId: string,
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    const columnData = await fetchAllColumns();
    const column = columnData.find((col) => col.id === columnId);
    if (!column) return;

    const updatedColumn = {
      ...column,
      elements: column.elements.filter((task) => task.id !== taskId),
    };

    updateSocketTasks(updatedColumn.elements, columnId, setTasks);
  };

  const onToggleTaskCompletion = async (
    taskId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    const columnData = await fetchAllColumns();
    const column = columnData.find((col) =>
      col.elements.some((task) => task.id === taskId)
    );

    if (!column) return;

    const updatedTasks = column.elements.map((task) =>
      task.id === taskId ? { ...task, isChecked: !task.isChecked } : task
    );

    updateSocketTasks(updatedTasks, column.id, setTasks);
  };

  const onAddColumn = (title: string) => {
    if (title.trim() === "") return;

    const newColumn: ColumnType = {
      id: uuidv4(),
      title,
      elements: [],
    };

    updateSocketBoard([...columns, newColumn]);
  };

  const onRemoveColumn = (columnId: string) => {
    updateSocketBoard(columns.filter((column) => column.id !== columnId));
  };

  return (
    <div className="flex-1 overflow-x-auto p-6">
      <div className="flex gap-6 min-w-max h-full">
        <ul className="flex flex-row list-none" ref={columnList}>
          {columns.map((column) => (
            <li key={column.id} className="flex-shrink-0 p-3">
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                cards={column.elements}
                handleRemoveColumn={onRemoveColumn}
                handleRemoveTask={(taskId, setTasks) =>
                  onRemoveTask(taskId, column.id, setTasks)
                }
                handleAddTask={(newName, setTasks) =>
                  onAddTask(newName, column.id, setTasks)
                }
                registerTasksSetter={registerTasksSetter}
                handleTaskCompletion={onToggleTaskCompletion}
              />
            </li>
          ))}
        </ul>
        <div className="flex-shrink-0">
          <ColumnForm handleAddColumn={onAddColumn} />
        </div>
      </div>
    </div>
  );
}
