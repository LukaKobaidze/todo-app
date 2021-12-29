import { useState, useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './TodoItem';
import classes from '../../styles/Todo/Todo.module.scss';
import TodoFilter from './TodoFilter';
import TodoInput from './TodoInput';
import TodoEmptyMessage from './TodoEmptyMessage';
import useDraggableInPortal from '../../hooks/useDraggableInPortal';

export enum statusTypes {
  Active = 'active',
  Completed = 'completed',
}

type todoType = {
  id: string;
  task: string;
  status: statusTypes;
};

const Todo = () => {
  const storageTodoList = (): todoType[] =>
    JSON.parse(window.localStorage.getItem('todoList')!);
  const initialTodo = storageTodoList() || [];

  const [todoList, setTodoList] = useState<todoType[]>(initialTodo);
  const [filter, setFilter] = useState<statusTypes | 'all'>('all');
  const enteredInputValue = useRef<HTMLInputElement>(null);
  const renderDraggable = useDraggableInPortal();

  const filterHandler = (type: statusTypes | 'all') => {
    if (type === filter) return;
    setFilter(type);
  };

  const clearHandler = (type: statusTypes) => {
    setTodoList(prevTodoList => {
      return prevTodoList.filter(item => item.status !== type);
    });
  };

  const deleteItemHandler = (id: string) => {
    setTodoList(prevTodoList => {
      return prevTodoList.filter(item => item.id !== id);
    });
  };

  const toggleCompleteHandler = (id: string) => {
    setTodoList(prevTodoList => {
      return prevTodoList.map(item => {
        const idItem = item.id === id;
        const toggle =
          item.status === statusTypes.Completed
            ? statusTypes.Active
            : statusTypes.Completed;

        return {
          ...item,
          status: idItem ? toggle : item.status,
        };
      });
    });
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = enteredInputValue.current!.value;
    if (value === '') return;
    setTodoList(prevTodoList => {
      enteredInputValue.current!.value = '';

      const uniqueId = value
        .split(' ')
        .join('-')
        .concat(Math.random().toString(16).slice(2));

      return [
        ...prevTodoList,
        {
          id: uniqueId,
          task: value,
          status: statusTypes.Active,
        },
      ];
    });
  };

  // Save todo list in local storage
  useEffect(() => {
    window.localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  const filteredList =
    filter === 'all'
      ? todoList
      : todoList.filter(item => item.status === filter);

  const itemsLeft = todoList.filter(
    item => item.status === statusTypes.Active
  ).length;

  const dragEndHandler = (result: any) => {
    if (!result.destination) return;
    const draggingItemId = result.draggableId;
    const replacingItemId = filteredList[result.destination.index].id;

    setTodoList(prevTodoList => {
      const list = prevTodoList.slice();
      const find = (id: string) => list.findIndex(item => item.id === id);
      const itemIndex1 = find(draggingItemId);
      const itemIndex2 = find(replacingItemId);
      const [item1] = list.splice(itemIndex1, 1);
      list.splice(itemIndex2, 0, item1);

      return list;
    });
  };

  return (
    <div>
      <div>
        <TodoInput onSubmit={submitHandler} inputRef={enteredInputValue} />
      </div>
      <div className={classes['items-filter-div']}>
        <DragDropContext onDragEnd={dragEndHandler}>
          <Droppable droppableId="todo-list">
            {provided => (
              <ul
                className={classes['items-wrapper']}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {filteredList.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {renderDraggable((provided: any, snapshot: any) => (
                        <TodoItem
                          provided={provided}
                          id={item.id}
                          task={item.task}
                          status={item.status}
                          deleteHandler={deleteItemHandler}
                          toggleCompleteHandler={toggleCompleteHandler}
                          isDragging={snapshot.isDragging}
                        />
                      ))}
                    </Draggable>
                  );
                })}

                {filteredList.length === 0 && (
                  <TodoEmptyMessage taskType={filter} />
                )}

                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
        <TodoFilter
          itemsLeft={itemsLeft}
          filterHandler={filterHandler}
          clear={{
            type: statusTypes.Completed,
            handler: clearHandler,
            typeAmount: todoList.filter(
              item => item.status === statusTypes.Completed
            ).length,
          }}
          curFilter={filter}
        />
      </div>
    </div>
  );
};

export default Todo;
