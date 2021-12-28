import { statusTypes } from './Todo';
import classes from '../../styles/Todo/TodoEmptyMessage.module.scss';

type Props = {
  taskType: statusTypes | 'all';
};

const TodoEmptyMessage = ({ taskType }: Props) => {
  return (
    <li className={classes.message}>
      You don't have any {taskType === 'all' ? '' : taskType} todos.
    </li>
  );
};

export default TodoEmptyMessage;
