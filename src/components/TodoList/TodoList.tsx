import React, { useEffect, useState } from "react";
import { useTodo } from "../../utils/contexts";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodoForm } from "../TodoForm/TodoForm";
import styles from "./TodoList.module.css";
import { Modal } from "../UI";
import { Card } from "../Card/Card";

export const TodoList = () => {
  const {
    todos,
    isVisible,
    closeModal,
    deleteTodo,
    checkTodo,
    todoIdForEdit,
    selectTodoIdForEdit,
  } = useTodo();
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onSelectTodo = (todo: Todo) => {
    setSelectedTodo(todo);
  };

  return (
    <>
      <div className={styles.containerWrap}>
        {todos.map((todo) => {
          if (todo.id === todoIdForEdit) {
            return <TodoForm mode="edit" editTodo={todo} />;
          }
          return (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              checkTodo={checkTodo}
              selectTodoId={selectTodoIdForEdit}
              onSelectTodo={onSelectTodo}
            />
          );
        })}
      </div>
      {isVisible && selectedTodo && (
        <Modal close={closeModal}>
          <Card todo={selectedTodo} />
        </Modal>
      )}
    </>
  );
};
