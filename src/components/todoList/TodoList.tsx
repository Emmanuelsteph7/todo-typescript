import SingleTodo from "../singleTodo/SingleTodo";
import { Todo } from "model/todoInterface";
import React, { FC } from "react";
import "./todoList.scss";
import { Droppable } from "react-beautiful-dnd";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="todoList">
      <div className="todoList__container">
        <Droppable droppableId="activeTasks">
          {(provided, snapshot) => (
            <div
              className={`todoList__activeTasks ${
                snapshot.isDraggingOver ? "active" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="todoList__header">Active Tasks</h3>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  key={todo.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completedTasks">
          {(provided, snapshot) => (
            <div
              className={`todoList__completedTasks ${
                snapshot.isDraggingOver ? "active" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h3 className="todoList__header">Completed Tasks</h3>
              {completedTodos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  completedTodos={completedTodos}
                  setCompletedTodos={setCompletedTodos}
                  key={todo.id}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
};

export default TodoList;
