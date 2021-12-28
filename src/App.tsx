import { useEffect, useState } from 'react';
import Background from './components/Background/Background';
import Todo from './components/Todo/Todo';
import Heading from './components/UI/Heading';
import BtnTheme from './components/UI/BtnTheme';
import classes from './styles/App.module.scss';

const changeTheme = (theme: 'dark' | 'light') => {
  const prevTheme = theme === 'dark' ? 'light' : 'dark';
  document.body.classList.remove(`theme--${prevTheme}`);
  document.body.classList.add(`theme--${theme}`);
};

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const toggleThemeHandler = () => {
    const toggle = theme === 'light' ? 'dark' : 'light';
    setTheme(toggle);
  };

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  return (
    <>
      <Background theme={theme} />
      <main>
        <div className={classes['div-heading']}>
          <Heading className={classes.heading}>TODO</Heading>
          <BtnTheme onClick={toggleThemeHandler} theme={theme} />
        </div>
        <Todo />
        <div>
          <p className={classes['text-dragndrop']}>
            Drag and drop to reorder list
          </p>
        </div>
      </main>
    </>
  );
}

export default App;
