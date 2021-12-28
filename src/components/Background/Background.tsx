import imageDark from '../../assets/images/bg-desktop-dark.jpg';
import imageDarkMobile from '../../assets/images/bg-mobile-dark.jpg';
import imageLight from '../../assets/images/bg-desktop-light.jpg';
import imageLightMobile from '../../assets/images/bg-mobile-light.jpg';
import Image from './Image';
import classes from '../../styles/Background/Background.module.scss';

type Props = {
  theme: 'dark' | 'light';
};

const BackgroundImage = ({ theme }: Props) => {
  return (
    <header className={classes.div}>
      {/* Dark theme */}
      {theme === 'dark' && (
        <Image image={imageDark} imageMobile={imageDarkMobile} />
      )}

      {/* Light theme */}
      {theme === 'light' && (
        <Image image={imageLight} imageMobile={imageLightMobile} />
      )}
    </header>
  );
};

export default BackgroundImage;
