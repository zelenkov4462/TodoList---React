import { createContext } from "react";

interface TodoContextProps {
  todos: Todo[];
  isVisible: boolean;
  openModal: () => void;
  closeModal: () => void;
  addTodo: ({
    description,
    selectedFiles,
    title,
  }: Omit<Todo, "id" | "checked">) => void;
  deleteTodo: (idTodo: Todo["id"]) => void;
  checkTodo: (idTodo: Todo["id"]) => void;
  selectTodoIdForEdit: (idTodo: Todo["id"]) => void;
  todoIdForEdit: Todo["id"] | null;
  editTodo: ({
    description,
    title,
    date,
  }: Omit<Todo, "id" | "checked">) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  isVisible: false,
  openModal: () => {},
  closeModal: () => {},
  addTodo: () => {},
  deleteTodo: (idTodo) => {},
  checkTodo: (idTodo) => {},
  selectTodoIdForEdit: (idTodo) => {},
  todoIdForEdit: null,
  editTodo: ({ description, title, date, selectedFiles }) => {},
});
