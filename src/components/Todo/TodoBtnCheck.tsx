import { statusTypes } from './Todo';
import classes from '../../styles/Todo/TodoBtnCheck.module.scss';
import IconCheck from '../Icons/IconCheck';

type Props = {
  status: statusTypes;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
};

const TodoBtnCheck = ({ status, type, onClick }: Props) => {
  const btnType = !type ? 'button' : type;

  return (
    <button
      className={`${classes.btn} ${classes[`btn--bg-${status}`]}`}
      onClick={onClick}
      type={btnType}
    >
      <IconCheck className={classes['checked--icon']} />
      {status === 'active' && <div className={classes['btn--overlay']} />}
    </button>
  );
};

export default TodoBtnCheck;
