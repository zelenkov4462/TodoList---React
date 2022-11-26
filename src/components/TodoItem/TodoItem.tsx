import React, { FC, useState } from "react";
import Button from "../UI/Button/Button";
import { inspect } from "util";
import styles from "./TodoItem.module.css";
import { useTodo } from "../../utils/contexts";
import { Modal } from "../UI";
import cn from "classnames";
import { Card } from "../Card/Card";

interface TodoItemProps {
  todo: Todo;
  deleteTodo: (idTodo: Todo["id"]) => void;
  checkTodo: (idTodo: Todo["id"]) => void;
  selectTodoId: (idTodo: Todo["id"]) => void;
  onSelectTodo: (todo: Todo) => void;
}

export const TodoItem: FC<TodoItemProps> = ({
  todo,
  checkTodo,
  deleteTodo,
  selectTodoId,
  onSelectTodo,
}) => {
  const { isVisible, openModal, closeModal } = useTodo();
  const now = Date.now();
  const isFailed = Date.parse(todo.date) <= now;
  const isChecked = todo.checked;

  const selectFiles = Array.isArray(todo.selectedFiles)
    ? todo.selectedFiles
    : [];

  const onChange = (e: any) => {
    e.stopPropagation();
    checkTodo(todo.id);
  };

  const editHandler = () => {
    selectTodoId(todo.id);
  };

  const deleteHandler = () => {
    deleteTodo(todo.id);
  };

  const openHandler = () => {
    openModal();
    onSelectTodo(todo);
  };

  return (
    <>
      <div className={styles.containerWrap}>
        <div
          className={cn(styles.container, {
            [styles.checked]: isChecked,
            [styles.failed]: isFailed,
          })}
          onClick={openHandler}
        >
          <div className={styles.leftSide}>
            <div className={styles.leftTitle}>
              <div
                className={cn(styles.title, {
                  [styles.line]: isChecked,
                })}
              >
                {todo.title}
              </div>
              <div
                className={cn(styles.description, {
                  [styles.line]: isChecked,
                })}
              >
                {todo.description}
              </div>
            </div>
            <div>
              <div className={styles.date}>{todo.date}</div>
            </div>
          </div>
          <div
            className={styles.rightSide}
            onClick={(e: any) => e.stopPropagation()}
          >
            <input
              className={styles.checkInput}
              type="checkbox"
              checked={todo.checked}
              onChange={onChange}
            />
            <Button onClick={editHandler} appearance="edit">
              edit
            </Button>
            <Button onClick={deleteHandler} appearance="delete">
              delete
            </Button>
          </div>

          <div className={styles.files}>
            {selectFiles.map((file) => (
              <div>{file.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
