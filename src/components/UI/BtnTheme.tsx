import IconSun from '../Icons/IconSun';
import IconMoon from '../Icons/IconMoon';
import classes from '../../styles/BtnTheme.module.scss';

type Props = {
  theme: 'dark' | 'light';
  onClick: () => void;
};

const BtnTheme = ({ theme, onClick }: Props) => {
  return (
    <div onClick={onClick} className={classes['theme-btn']}>
      {theme === 'dark' && <IconSun />}
      {theme === 'light' && <IconMoon />}
    </div>
  );
};

export default BtnTheme;
