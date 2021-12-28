import classes from '../../styles/Todo/TodoFilter.module.scss';
import { statusTypes } from './Todo';

type Props = {
  itemsLeft: number;
  filterHandler: (type: statusTypes | 'all') => void;
  curFilter: statusTypes | 'all';
  clear?: {
    type: statusTypes;
    handler: (type: statusTypes) => void;
  };
};

const TodoFilter = (props: Props) => {
  const { itemsLeft, filterHandler, curFilter, clear } = props;
  return (
    <div className={classes.filter}>
      <span className={classes['filter--items-left']}>
        {itemsLeft > 0 ? itemsLeft : 'No'} {itemsLeft === 1 ? 'item' : 'items'}{' '}
        left
      </span>
      <div className={classes['filter--div']}>
        <span
          onClick={filterHandler.bind(null, 'all')}
          className={curFilter === 'all' ? classes['filter--active'] : ''}
        >
          All
        </span>
        {Object.values(statusTypes).map(value => {
          return (
            <span
              key={value}
              className={value === curFilter ? classes['filter--active'] : ''}
              onClick={filterHandler.bind(null, value)}
            >
              {value}
            </span>
          );
        })}
      </div>
      {clear && (
        <span
          className={classes['filter--clear']}
          onClick={clear.handler.bind(null, clear.type)}
        >
          Clear {clear.type}
        </span>
      )}
    </div>
  );
};

export default TodoFilter;
