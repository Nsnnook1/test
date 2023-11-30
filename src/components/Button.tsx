import { Button } from "antd";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const ButtonBox: React.FC<ButtonProps> = ({ onClick, text }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default ButtonBox;
