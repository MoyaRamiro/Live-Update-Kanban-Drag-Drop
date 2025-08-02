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

  const updateSocketBoard = SocketData(setColumns);

  const onAddTask = (
    newName: string,
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          elements: [
            ...column.elements,
            { id: uuidv4(), name: newName, isChecked: false },
          ],
        };
      }
      return column;
    });
    updateSocketBoard(newColumns);

    const updatedColumn = newColumns.find((col) => col.id === columnId);
    if (updatedColumn) {
      setTasks(updatedColumn.elements);
    }
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

  const onRemoveTask = (
    taskId: string,
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          elements: column.elements.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });

    updateSocketBoard(newColumns);

    const updatedColumn = newColumns.find((col) => col.id === columnId);
    if (updatedColumn) {
      setTasks(updatedColumn.elements);
    }
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
