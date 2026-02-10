import styled from "styled-components";
import bell from "../assets/images/icon/bell.svg";

interface Props {
  hasUnread?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const Alarm = ({
  hasUnread = false,
  onClick,
  disabled = false,
  className,
}: Props) => {
  return (
    <Button onClick={onClick} disabled={disabled} className={className}>
      <Icon src={bell} alt="" />
      {hasUnread ? <Dot /> : null}
    </Button>
  );
};

const Button = styled.button`
  position: relative;

  width: 40px;
  height: 40px;

  border: 0;
  padding: 0;
  border-radius: 10px;
  background: transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-primary-200);
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  display: block;
`;

const Dot = styled.span`
  position: absolute;
  top: 11px;
  right: 11.5px;

  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1.5px solid white;

  background: var(--color-error);
`;

export default Alarm;
