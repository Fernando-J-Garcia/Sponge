import { jsx } from "@emotion/react";
import { prepareServerlessUrl } from "next/dist/server/base-server";
import React, { createContext, FC, useContext, useRef, useState } from "react";
interface CanvasContextInterface {
  elements: JSX.Element[];
  addElement: (element: JSX.Element) => void;
  setElements: (value: JSX.Element[]) => void;
  focusedElement: HTMLDivElement | null;
  setFocusedElement: (element: HTMLDivElement) => void;
  currentColor: string;
  setCurrentColor: (value: string) => void;
}
const defaultValue = {
  elements: [],
  addElement: () => {
    console.log("default");
  },
  setElements: () => {},
  focusedElement: null,
  setFocusedElement: () => {},
  currentColor: "#000000",
  setCurrentColor: () => {},
};
export const CanvasContext =
  createContext<CanvasContextInterface>(defaultValue);

export function CanvasProvider({ children }: any) {
  const [elements, setElements] = useState<JSX.Element[]>([]);
  const focusedElement = useRef<HTMLDivElement | null>(null);
  const currentColor = useRef("#000000");

  function addElement(element: JSX.Element) {
    console.log(element);
    setElements((prev) => [...prev, element]);
  }
  function setFocusedElement(element: HTMLDivElement) {
    focusedElement.current = element;
  }
  const value: CanvasContextInterface = {
    elements: elements,
    addElement: addElement,
    setElements: (value: JSX.Element[]) => setElements(value),
    focusedElement: focusedElement.current,
    setFocusedElement: setFocusedElement,
    currentColor: currentColor.current,
    setCurrentColor: (value: string) => {
      currentColor.current = value;
      console.log({ currentColor: value });
      console.log(currentColor);
    },
  };
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}
