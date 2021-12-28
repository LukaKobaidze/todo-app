import classes from '../../styles/Background/Image.module.scss';

type Props = {
  image: any;
  imageMobile: any;
};

const Image = ({ image, imageMobile }: Props) => {
  return (
    <picture>
      <source srcSet={image} media="(min-width: 376px)" />
      <img
        src={imageMobile}
        className={classes.image}
        alt=""
        draggable="false"
      />
    </picture>
  );
};

export default Image;
