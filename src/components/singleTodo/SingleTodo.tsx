import { Todo } from "model/todoInterface";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { FC, useEffect, useRef, useState } from "react";
import "./singleTodo.scss";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: FC<Props> = ({
  index,
  todo,
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = () => {
    if (!edit && !todo.isCompleted) {
      setEdit(!edit);
    }
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleCompleted = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editText } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`singleTodo ${snapshot.isDragging ? "active" : ""}`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form
            className="singleTodo__form"
            onSubmit={(e) => handleSubmit(e, todo.id)}
          >
            {edit ? (
              <input
                type="text"
                ref={inputRef}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="singleTodo__input"
              />
            ) : todo.isCompleted ? (
              <s className="singleTodo__text">{todo.todo}</s>
            ) : (
              <span className="singleTodo__text">{todo.todo}</span>
            )}
            <div className="singleTodo__icons">
              <AiFillEdit onClick={() => handleEdit()} />
              <AiFillDelete onClick={() => handleDelete(todo.id)} />
              <MdDone onClick={() => handleCompleted(todo.id)} />
            </div>
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default SingleTodo;
