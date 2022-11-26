import React, { FC } from "react";
import styles from "./Card.module.css";

interface CardProps {
  todo: Todo;
}

export const Card: FC<CardProps> = ({ todo }) => {
  const isCheck = todo.checked === true;
  const files = Array.isArray(todo.selectedFiles) ? todo.selectedFiles : [];
  return (
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>{todo.title}</div>
        </div>
        <div className={styles.content}>
          <div className={styles.description}>{todo.description}</div>
          <div className={styles.data}>Выполнить до: {todo.date}</div>
          <div className={styles.file}>
            Прикрепленные файлы:{" "}
            {files.map((file) => (
              <div>{file.name}</div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.check}>
            Статус:{" "}
            {!isCheck ? (
              <span className={styles.load}>"В процессе..."</span>
            ) : (
              <span className={styles.complete}>"Выполнено!"</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
