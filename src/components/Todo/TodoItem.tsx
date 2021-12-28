import { statusTypes } from './Todo';
import TodoBtnCheck from './TodoBtnCheck';
import TodoItemText from './TodoItemText';

import classes from '../../styles/Todo/TodoItem.module.scss';
import IconCross from '../Icons/IconCross';

type Props = {
  id: string;
  task: string;
  status: statusTypes;
  deleteHandler: (id: string) => void;
  toggleCompleteHandler: (id: string) => void;
  provided: any;
  isDragging: boolean;
};

const TodoItem = (props: Props) => {
  const {
    id,
    task,
    status,
    deleteHandler,
    toggleCompleteHandler,
    provided,
    isDragging,
  } = props;

  return (
    <li
      className={`${classes.item} ${
        isDragging ? classes['item--dragging'] : ''
      }`}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <TodoBtnCheck
        status={status}
        onClick={toggleCompleteHandler.bind(null, id)}
      />
      <TodoItemText
        task={task}
        status={status}
        onClick={toggleCompleteHandler.bind(null, id)}
      />
      <IconCross
        className={classes['icon-cross']}
        onClick={deleteHandler.bind(null, id)}
      />
    </li>
  );
};

export default TodoItem;
