import classes from '../../styles/Todo/TodoItemText.module.scss';
import { statusTypes } from './Todo';

type Props = {
  task: string;
  status: statusTypes;
  onClick?: () => void;
};

const TodoItemText = ({ task, status, onClick }: Props) => {
  return (
    <span
      className={`${classes.text} ${
        status === statusTypes.Completed ? classes['text--completed'] : ''
      }`}
      onClick={onClick}
    >
      {task}
    </span>
  );
};

export default TodoItemText;
