import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";
import { ColumnType } from "../types/columnType";
import { CardType } from "../types/cardType";

export function SocketData(setColumns: (data: ColumnType[]) => void) {
  const socketRef = useRef<Socket | null>(null);

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

      socketRef.current.on("updateTasksData", (data: CardType[]) => {
        console.log("📨 Actualización tasks recibida:", data);
        //setTasks(data); de la columna correspondiente  /////////como llevo el setTasks correspondiente
      });
    }

    return () => {
      if (socketRef.current) {
        console.log("🔌 Desconectando socket...");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const updateSocketBoard = (data: ColumnType[]) => {
    setColumns([...data]);
    socketRef.current?.emit("boardsUpdate", { boardData: data });
    console.log("🔄 Emitiendo actualización BOARD de servidor:", data);
  };

  const updateSocketTasks = (
    data: CardType[],
    columnId: string,
    setTasks: (data: CardType[]) => void
  ) => {
    console.log("🔄 Emitiendo actualización TASKS de servidor:", data);
    setTasks(data);
    socketRef.current?.emit("tasksUpdate", {
      taskData: data,
      boardId: columnId,
    });
  };

  return { updateSocketBoard, updateSocketTasks };
}
