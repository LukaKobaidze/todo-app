import TodoBtnCheck from './TodoBtnCheck';
import { statusTypes } from './Todo';
import classes from '../../styles/Todo/TodoInput.module.scss';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

const TodoInput = ({ onSubmit, inputRef }: Props) => {
  const btnClickHandler = (event: any) => {
    if (!inputRef.current) return;
    onSubmit(event);
    inputRef.current.focus();
  };

  return (
    <div className={classes['todo-input-div']}>
      <form onSubmit={onSubmit}>
        <TodoBtnCheck status={statusTypes.Active} onClick={btnClickHandler} />
        <input
          className={classes['todo-input-div--input']}
          ref={inputRef}
          placeholder="Create a new todo..."
        />
      </form>
    </div>
  );
};

export default TodoInput;
