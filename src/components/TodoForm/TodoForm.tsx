import React, { ChangeEvent, FC, useId, useRef, useState } from "react";
import { useTodo } from "../../utils/contexts";
import styles from "./TodoForm.module.css";
import Button from "../UI/Button/Button";
import cn from "classnames";

const DEFAULT_TODO = {
  title: "",
  description: "",
  selectedFiles: null,
  date: "",
};

interface AddTodoFormProps {
  mode: "add";
}

interface EditTodoFormProps {
  mode: "edit";
  editTodo: Omit<Todo, "id" | "checked">;
}

type TodoFormProps = AddTodoFormProps | EditTodoFormProps;

export const TodoForm: FC<TodoFormProps> = (props) => {
  const isEdit = props.mode === "edit";
  const [todo, setTodo] = useState<Omit<Todo, "id" | "checked">>(
    isEdit ? props.editTodo : DEFAULT_TODO
  );
  const filePicker = useRef(null);
  const { addTodo, todoIdForEdit, editTodo } = useTodo();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "file") {
      // @ts-ignore
      setTodo({ ...todo, selectedFiles: [...e.target.files] });
    } else if (name === "date") {
      setTodo({ ...todo, date: e.target.value });
    } else {
      setTodo({ ...todo, [name]: value });
    }
  };

  const selectedFiles = Array.isArray(todo.selectedFiles)
    ? todo.selectedFiles
    : [];

  const pickHandler = () => {
    // @ts-ignore
    filePicker?.current?.click();
  };

  const addHandler = () => {
    if (isEdit) {
      return editTodo(todo);
    }
    addTodo(todo);
    setTodo(DEFAULT_TODO);
  };
  return (
    <div className={styles.containerWrap}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.containerItem}>
            <div className={styles.item}>
              <label htmlFor="title">
                <div className={styles.label}>title</div>
                <input
                  className={styles.input}
                  placeholder="Введите заголовок"
                  onChange={onChange}
                  id="title"
                  name="title"
                  value={todo.title}
                  type="text"
                />
              </label>
            </div>
            <div>
              <label htmlFor="description">
                <div className={styles.label}>description</div>
                <input
                  className={styles.input}
                  placeholder="Добавьте описание"
                  onChange={onChange}
                  id="description"
                  name="description"
                  value={todo.description}
                  type="text"
                />
              </label>
            </div>
          </div>
          <div className={styles.containerItem}>
            <div>
              <label htmlFor="date">
                <div className={styles.label}>date</div>
                <input
                  className={styles.input}
                  type="date"
                  name="date"
                  id="date"
                  value={todo.date}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className={styles.mb}>
              <label htmlFor="file">
                <Button onClick={pickHandler} appearance="file">
                  Add files
                </Button>
                <input
                  // className={styles.dateInput}
                  ref={filePicker}
                  multiple={true}
                  id="file"
                  name="file"
                  // style={{ opacity: "0" }}
                  style={{ display: "none" }}
                  type="file"
                  onChange={onChange}
                />
              </label>
            </div>
          </div>
          <div className={cn(styles.containerItem, styles.addBtn)}>
            <Button onClick={addHandler} appearance="add">
              {isEdit ? "Edit task" : "add task"}
            </Button>
          </div>
        </div>
        <div className={styles.bottom}>
          {selectedFiles.map((file) => (
            <div key={file.lastModified}>{file.name}</div>
            //   <img src="" alt=""/>
          ))}
        </div>
      </div>
    </div>
  );
};
