interface Props {
  children: React.ReactNode;
  className?: string;
}

const Heading = (props: Props) => {
  return <h1 className={props.className}>{props.children}</h1>;
};

export default Heading;
