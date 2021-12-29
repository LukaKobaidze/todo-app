import { useEffect, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';
import classes from '../../styles/Todo/TodoFilter.module.scss';
import { statusTypes } from './Todo';

type Props = {
  itemsLeft: number;
  filterHandler: (type: statusTypes | 'all') => void;
  curFilter: statusTypes | 'all';
  clear?: {
    type: statusTypes;
    handler: (type: statusTypes) => void;
    typeAmount: number;
  };
};

const TodoFilter = (props: Props) => {
  const { itemsLeft, filterHandler, curFilter, clear } = props;
  const [showClearConfirmation, setShowClearConfirmation] = useState(false);
  const { ref, clickedOutside, setClickedOutside } = useClickOutside(false);

  useEffect(() => {
    if (clickedOutside) {
      setShowClearConfirmation(false);
      setClickedOutside(false);
    }
  });

  const toggleConfirmationHandler = () => {
    setShowClearConfirmation(curState => {
      if (clear?.typeAmount === 0) return curState;
      return !curState;
    });
  };

  const hideConfirmationHandler = () => {
    setShowClearConfirmation(false);
  };

  const deleteHandler = () => {
    clear!.handler(clear!.type);
    hideConfirmationHandler();
  };
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
        <div className={classes['filter--clear-div']} ref={ref}>
          {showClearConfirmation && (
            <div className={classes['filter--clear-confirmation']}>
              <p>
                Are you sure you want to delete all of your {clear.type} todos?
              </p>
              <button onClick={deleteHandler}>Delete</button>
            </div>
          )}
          <span
            className={classes['filter--clear-text']}
            onClick={toggleConfirmationHandler}
          >
            Clear {clear.type}
          </span>
        </div>
      )}
    </div>
  );
};

export default TodoFilter;
