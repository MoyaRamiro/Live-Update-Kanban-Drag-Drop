"use client";
import { ColumnList } from "./components/columnList";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { ColumnType } from "./types/columnType";
import { useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useEffect } from "react";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col bg-gradient-to-br from-gray-900 to-gray-950 text-white">
      <span className="w-screen h-8 p-6 bg-black shadow-lg z-10"></span>

      <ColumnList />
    </div>
  );
}
