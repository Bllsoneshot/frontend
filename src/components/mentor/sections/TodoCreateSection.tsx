import { useMemo, useState } from "react";
import styled from "styled-components";

import CalendarIcon from "../../../assets/images/icon/month.svg?react";
import UploadIcon from "../../../assets/images/icon/upload.svg?react";
import PencilIcon from "../../../assets/images/icon/pen.svg?react";

import type { SubjectKey } from "../../SubjectAddButton";
import SubjectSelectButton from "../../SubjectSelectButton";
import ToggleSwitch from "../../ToggleSwitch";
import Input from "../../Input";
import Button from "../../Button";
import SquareChip from "../../SquareChip";
import { typography } from "../../../styles/typography";

export default function TodoCreateSection() {
  const [subject, setSubject] = useState<SubjectKey>("KOREAN");
  const [usePeriod, setUsePeriod] = useState(false);

  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [taskName, setTaskName] = useState("");
  const [goalMinutes, setGoalMinutes] = useState("");

  const isValid = useMemo(() => {
    const hasName = taskName.trim().length > 0;

    const minutes = Number(goalMinutes);
    const hasMinutes =
      goalMinutes.trim().length > 0 && !Number.isNaN(minutes) && minutes > 0;

    const hasDate = !usePeriod
      ? String(date).trim().length > 0
      : String(startDate).trim().length > 0 &&
        String(endDate).trim().length > 0;

    return !!subject && hasDate && hasName && hasMinutes;
  }, [subject, usePeriod, date, startDate, endDate, taskName, goalMinutes]);

  const handleSubmit = () => {
    const payload = {
      subject,
      usePeriod,
      taskName,
      goalMinutes: Number(goalMinutes),

      ...(usePeriod ? { startDate, endDate } : { date }),
    };

    console.log(payload);
    alert("일 등록 API 연결 예정");
  };

  return (
    <Wrap>
      <FormGrid>
        <Row>
          <RowLabel>
            과목 <Required>*</Required>
          </RowLabel>

          <RowBody>
            <SubjectSelectButton value={subject} onChange={setSubject} />
          </RowBody>
        </Row>

        <Row>
          <RowTop>
            <RowLabel>
              날짜 <Required>*</Required>
            </RowLabel>

            <ToggleWrap>
              <InfoDot />
              <ToggleText>기간으로 받기</ToggleText>
              <ToggleSwitch
                on={usePeriod}
                onChange={(next) => {
                  setUsePeriod(next);

                  if (next) setDate("");
                  else {
                    setStartDate("");
                    setEndDate("");
                  }
                }}
              />
            </ToggleWrap>
          </RowTop>

          <RowBody>
            {!usePeriod ? (
              <Input
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="YYYY-MM-DD"
                rightIcon={<CalendarIcon />}
                readOnly={false}
              />
            ) : (
              <PeriodGrid>
                <Input
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  rightIcon={<CalendarIcon />}
                  readOnly={false}
                />
                <Input
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="YYYY-MM-DD"
                  rightIcon={<CalendarIcon />}
                  readOnly={false}
                />
              </PeriodGrid>
            )}
          </RowBody>
        </Row>

        <Row>
          <RowTop>
            <RowLabel>
              할 일 이름 <Required>*</Required>
            </RowLabel>

            <AddBtn>
              <Button onClick={() => {}} disabled={!taskName.trim()}>
                추가
              </Button>
            </AddBtn>
          </RowTop>

          <RowBody>
            <Input
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="예: 영어단어 10개 외우기"
              maxLength={50}
              showCount
              countPosition="bottom"
            />
          </RowBody>
        </Row>

        <Row>
          <RowLabel>
            목표 시간 (분) <Required>*</Required>
          </RowLabel>

          <RowBody>
            <InputWrap>
              <Input
                value={goalMinutes}
                onChange={(e) => {
                  const next = e.target.value.replace(/[^\d]/g, "");
                  setGoalMinutes(next);
                }}
                placeholder="예: 60"
                inputMode="numeric"
              />
            </InputWrap>
          </RowBody>
        </Row>

        <Row>
          <RowLabel>학습 자료</RowLabel>

          <RowBody>
            <ResourceGrid>
              <SquareChip onClick={() => {}}>
                <Inner>
                  <Icon>
                    <UploadIcon />
                  </Icon>
                  <Title>PDF 파일 업로드</Title>
                  <Desc>학습 자료를 첨부하세요.</Desc>
                </Inner>
              </SquareChip>

              <SquareChip onClick={() => {}}>
                <Inner>
                  <Icon>
                    <PencilIcon />
                  </Icon>
                  <Title>설스터디 칼럼 링크</Title>
                  <Desc>칼럼 URL을 입력하세요.</Desc>
                </Inner>
              </SquareChip>
            </ResourceGrid>
          </RowBody>
        </Row>
      </FormGrid>

      <Bottom>
        <Button disabled={!isValid} onClick={handleSubmit}>
          할 일 등록하기
        </Button>
      </Bottom>
    </Wrap>
  );
}

const Wrap = styled.section`
  width: 100%;
`;

const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const RowTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const RowLabel = styled.div`
  text-align: left;
  ${typography.t14sb}
  color: var(--color-black);
`;

const Required = styled.span`
  color: var(--color-primary-500);
  margin-left: 4px;
`;

const RowBody = styled.div`
  width: 100%;
`;

const ToggleWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--color-gray-700);
`;

const ToggleText = styled.span`
  ${typography.t14r}
  color: var(--color-gray-700);
`;

const InfoDot = styled.span`
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: color-mix(in srgb, var(--color-primary-500) 20%, transparent);
  border: 1px solid
    color-mix(in srgb, var(--color-primary-500) 60%, transparent);
  position: relative;

  &::after {
    content: "i";
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    font-size: 11px;
    font-weight: 700;
    color: var(--color-primary-500);
    line-height: 1;
  }
`;

const PeriodGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 744px) {
    grid-template-columns: 1fr;
  }
`;

const AddBtn = styled.div`
  display: flex;
  align-items: center;

  & > * {
    width: 49px;
    height: 36px;
    ${typography.t14sb}
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Icon = styled.div`
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;

  svg {
    width: 28px;
    height: 28px;
  }

  /* svg path 색 바꾸고 싶으면 */
  svg path {
    stroke: var(--color-blue-500);
  }
`;

const Title = styled.div`
  ${typography.t16sb}
  color: var(--color-black);
`;

const Desc = styled.div`
  ${typography.t12r}
  color: var(--color-gray-500);
`;

const Bottom = styled.div`
  margin-top: 45px;
`;

const InputWrap = styled.div`
  max-width: 510px;
`;
