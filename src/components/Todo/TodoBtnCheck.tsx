import { statusTypes } from './Todo';
import classes from '../../styles/Todo/TodoBtnCheck.module.scss';
import IconCheck from '../Icons/IconCheck';

type Props = {
  status: statusTypes;
  onClick?: (event?: any) => void;
};

const TodoBtnCheck = ({ status, onClick }: Props) => {
  return (
    <div
      className={`${classes.btn} ${classes[`btn--bg-${status}`]}`}
      onClick={onClick}
    >
      <IconCheck className={classes['checked--icon']} />
      {status === 'active' && <div className={classes['btn--overlay']} />}
    </div>
  );
};

export default TodoBtnCheck;
