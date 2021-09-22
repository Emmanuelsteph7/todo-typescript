import { FC } from "react";
import "./header.scss";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAddTodo: (e: React.FormEvent) => void;
}

const Header: FC<Props> = ({ todo, setTodo, handleAddTodo }) => {
  return (
    <div className="header" onSubmit={handleAddTodo}>
      <h1 className="header__header">Eming Tasks</h1>
      <form className="header__form">
        <div className="header__inputDiv">
          <input
            type="text"
            value={todo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTodo(e.target.value)
            }
            className="header__input"
          />
        </div>
        <div className="header__submit">
          <button className="header__button" type="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default Header;
