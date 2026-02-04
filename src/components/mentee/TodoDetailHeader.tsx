import styled from "styled-components";
import SubjectChip from "../SubjectChip";
import { typography } from "../../styles/typography";
import backIconSrc from "../../assets/images/icon/left.svg";
import type { SubjectKey } from "../SubjectAddButton";

interface Props {
  title: string;
  subject?: SubjectKey;
  onClickBack: () => void;
  className?: string;
}

const TodoDetailHeader = ({
  title,
  subject,
  onClickBack,
  className,
}: Props) => {
  return (
    <Wrap className={className}>
      <Inner>
        <BackButton onClick={onClickBack}>
          <BackIcon src={backIconSrc} alt="" />
        </BackButton>

        <TitleArea>
          {subject ? <SubjectChip subject={subject} /> : null}
          <Title>{title}</Title>
        </TitleArea>
      </Inner>
    </Wrap>
  );
};

const Wrap = styled.header`
  width: 100%;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const Inner = styled.div`
  height: 48px;
  padding: 0 14px;

  display: flex;
  align-items: center;
  gap: 12px;
`;

const BackButton = styled.button`
  border: 0;
  background: transparent;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const BackIcon = styled.img`
  width: 22px;
  height: 22px;
`;

const TitleArea = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Title = styled.h1`
  ${typography.t16sb}

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default TodoDetailHeader;
