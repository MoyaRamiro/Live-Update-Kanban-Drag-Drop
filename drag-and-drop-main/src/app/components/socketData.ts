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
        console.log("📨 Actualización recibida:", data);
        setColumns(data);
      });

      socketRef.current.on("updateCardsData", (data: CardType[]) => {
        console.log("📨 Actualización recibida:", data);
        //setTasks(data); de la columna correspondiente  /////////PRIMERO
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
    console.log("🔄 Emitiendo actualización de servidor:", data);
  };

  const updateSocketCards = (data: CardType[], columnId: string) => {
    socketRef.current?.emit("cardsUpdate", { cardData: data, columnId });
    console.log("🔄 Emitiendo actualización de servidor:", data);
  };

  return { updateSocketBoard, updateSocketCards };
}
