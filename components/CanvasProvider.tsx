import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
interface CanvasContextInterface {
  elements: JSX.Element[];
  addElement: (element: JSX.Element) => void;
  setElements: (value: JSX.Element[]) => void;
  elementPropertiesList: HTMLDivElement[];
  addElementProperty: (value: HTMLDivElement) => void;
  setElementPropertyColor: (value: string, index: number) => void;
  setElementPropertyRotation: (value: string, index: number) => void;
  setElementPropertyBoxShadow: (
    offsetX: number,
    offsetY: number,
    blur: number,
    spread: number,
    color: string,
    index: number
  ) => void;
  setElementPropertyBorder: (
    size: number,
    color: string,
    style: string,
    index: number
  ) => void;
  focusedElement: HTMLDivElement | null;
  setFocusedElement: (element: HTMLDivElement | null) => void;
  currentColor: string;
  setCurrentColor: (value: string) => void;
}
const defaultValue = {
  elements: [],
  addElement: () => {
    console.log("default");
  },
  setElements: () => {},
  elementPropertiesList: [],
  addElementProperty: () => {},
  setElementPropertyColor: () => {},
  setElementPropertyRotation: () => {},
  setElementPropertyBoxShadow: () => {},
  setElementPropertyBorder: () => {},
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
  const [elementPropertiesList, setElementPropertiesList] = useState<
    HTMLDivElement[]
  >([]);
  const currentColor = useRef("#000000");

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousemove", handleMouseMove);
  }, []);

  //MOUSE EVENTS=========================================================================
  let offsetLeft = 0;
  let offsetTop = 0;

  function handleMouseMove(e: MouseEvent) {
    if (focusedElement.current === null) return;
    const rectStyle = getComputedStyle(focusedElement.current);

    if (offsetLeft === 0) offsetLeft = e.clientX - parseInt(rectStyle.left);
    if (offsetTop === 0) offsetTop = e.clientY - parseInt(rectStyle.top);

    //console.log(e.clientX, parseInt(rectStyle.left));
    focusedElement.current.style.left = e.clientX - offsetLeft + "px";
    focusedElement.current.style.top = e.clientY - offsetTop + "px";
  }
  function handleMouseUp() {
    focusedElement.current = null;
    offsetLeft = 0;
    offsetTop = 0;
  }
  //End Mouse Events ====================================================================

  function addElement(element: JSX.Element) {
    setElements((prev) => [...prev, element]);
  }
  function setFocusedElement(element: HTMLDivElement | null) {
    focusedElement.current = element;
    if (focusedElement.current === null) return;
  }
  function addElementProperty(value: HTMLDivElement) {
    setElementPropertiesList((prev) => [...prev, value]);
  }
  function setElementPropertyColor(value: string, index: number) {
    const result = elementPropertiesList;
    result[index].style.backgroundColor = value;
  }
  function setElementPropertyRotation(value: string, index: number) {
    const result = elementPropertiesList;
    result[index].style.transform = `rotate(${value})`;
  }
  function setElementPropertyBoxShadow(
    offsetX: number,
    offsetY: number,
    blur: number,
    spread: number,
    color: string,
    index: number
  ) {
    const result = elementPropertiesList;
    result[
      index
    ].style.boxShadow = `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
  }
  function setElementPropertyBorder(
    size: number,
    color: string,
    style: string,
    index: number
  ) {
    const result = elementPropertiesList;
    result[index].style.border = `${size}px ${style} ${color}`;
  }

  const value: CanvasContextInterface = {
    elements: elements,
    addElement: addElement,
    setElements: (value: JSX.Element[]) => setElements(value),
    elementPropertiesList: elementPropertiesList,
    addElementProperty: addElementProperty,
    setElementPropertyColor: setElementPropertyColor,
    setElementPropertyRotation: setElementPropertyRotation,
    setElementPropertyBoxShadow: setElementPropertyBoxShadow,
    setElementPropertyBorder: setElementPropertyBorder,
    focusedElement: focusedElement.current,
    setFocusedElement: setFocusedElement,
    currentColor: currentColor.current,
    setCurrentColor: (value: string) => {
      currentColor.current = value;
    },
  };
  return (
    <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
  );
}
