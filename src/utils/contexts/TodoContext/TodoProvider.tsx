import React, { FC, useEffect, useMemo, useState } from "react";
import { TodoContext } from "./TodoContext";

const DEFAULT_TODOS_LIST = [
  {
    id: 1,
    title: "1",
    description: "1d",
    checked: false,
    selectedFiles: null,
    // date: day.format("DD/MM/YYYY"),
    date: Date.now(),
  },
  {
    id: 2,
    title: "2",
    description: "2d",
    checked: true,
    selectedFiles: null,
    date: Date.now(),
  },
  {
    id: 3,
    title: "3",
    description: "3d",
    checked: false,
    selectedFiles: null,
    date: Date.now(),
  },
];

interface TodoProviderProps {
  children: React.ReactNode;
}

export const TodoProvider: FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    // @ts-ignore
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [todoIdForEdit, setTodoIdForEdit] = useState<Todo["id"] | null>(null);

  useEffect(() => {
    localStorage.getItem("todos");
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  const selectTodoIdForEdit = (id: Todo["id"]) => {
    setTodoIdForEdit(id);
  };

  const addTodo = ({
    description,
    selectedFiles,
    title,
    date,
  }: Omit<Todo, "id" | "checked">) => {
    setTodos([
      ...todos,
      {
        id: Date.now(),
        checked: false,
        selectedFiles,
        title,
        description,
        date: date,
      },
    ]);
  };

  const deleteTodo = (id: Todo["id"]) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const checkTodo = (id: Todo["id"]) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked: !todo.checked };
        }
        return todo;
      })
    );
  };

  const editTodo = ({
    description,
    date,
    title,
    selectedFiles,
  }: Omit<Todo, "id" | "checked">) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === todoIdForEdit) {
          return { ...todo, title, description, date, selectedFiles };
        }
        return todo;
      })
    );
    setTodoIdForEdit(null);
  };

  const value = useMemo(() => {
    return {
      todos,
      isVisible,
      openModal,
      closeModal,
      addTodo,
      deleteTodo,
      checkTodo,
      todoIdForEdit,
      selectTodoIdForEdit,
      editTodo,
    };
  }, [
    todos,
    isVisible,
    openModal,
    closeModal,
    selectTodoIdForEdit,
    todoIdForEdit,
    checkTodo,
    deleteTodo,
    addTodo,
    editTodo,
  ]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
