import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { ColumnType } from "../types/columnType";
import { CardType } from "../types/cardType";

export function SocketData(setColumns: (data: ColumnType[]) => void) {
  const socketRef = useRef<Socket | null>(null);
  const tasksSetters = useRef<Map<string, (data: CardType[]) => void>>(
    new Map()
  );

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io("http://localhost:3001/", {
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log("✅ Conectado al servidor");
      });

      socketRef.current.on("initialBoardData", (data: ColumnType[]) => {
        console.log("📨 Datos iniciales recibidos:", data);
        setColumns(data);
      });

      socketRef.current.on("updateColumnsData", (data: ColumnType[]) => {
        console.log("📨 Actualización columns recibida:", data);
        setColumns(data);
      });

      socketRef.current.on(
        "updateTasksData",
        (data: { taskData: CardType[]; boardId: string }) => {
          console.log("📨 Actualización tasks recibida:", data);
          const setTasks = tasksSetters.current.get(data.boardId);
          if (setTasks) {
            setTasks(data.taskData);
          }
        }
      );
    }

    return () => {
      if (socketRef.current) {
        console.log("🔌 Desconectando socket...");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const registerTasksSetter = (
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    tasksSetters.current.set(columnId, setTasks);
    return () => {
      tasksSetters.current.delete(columnId);
    };
  };

  const updateSocketBoard = (data: ColumnType[]) => {
    setColumns([...data]);
    socketRef.current?.emit("boardsUpdate", { boardData: data });
  };

  const updateSocketTasks = (
    data: CardType[],
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    setTasks(data);
    socketRef.current?.emit("tasksUpdate", {
      taskData: data,
      boardId: columnId,
    });
  };

  const fetchAllColumns = (): Promise<ColumnType[]> => {
    return new Promise((resolve) => {
      if (socketRef.current) {
        const handler = (data: ColumnType[]) => {
          socketRef.current?.off("receiveAllColumns", handler);
          resolve(data);
        };
        
        socketRef.current.on("receiveAllColumns", handler);
        socketRef.current.emit("getAllColumns");
      } else {
        resolve([]);
      }
    });
  };

  return {
    updateSocketBoard,
    updateSocketTasks,
    registerTasksSetter,
    fetchAllColumns,
  };
}
