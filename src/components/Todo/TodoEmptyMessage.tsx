import { statusTypes } from './Todo';
import classes from '../../styles/Todo/TodoEmptyMessage.module.scss';

type Props = {
  taskType: statusTypes | 'all';
};

const TodoEmptyMessage = ({ taskType }: Props) => {
  return (
    <p className={classes.message}>
      You don't have any {taskType === 'all' ? '' : taskType} todos.
    </p>
  );
};

export default TodoEmptyMessage;
