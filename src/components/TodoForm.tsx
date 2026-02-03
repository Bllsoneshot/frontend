import { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";
import { typography } from "../styles/typography";

export type TodoFormMode = "create" | "edit";

export interface TodoFormProps {
  mode: TodoFormMode;
  initialValues?: {
    name: string;
    time: string;
  };
  onSubmit?: (data: { name: string; time: string }) => void;
}

const Title = styled.h2`
  ${typography.t18sb}
  color: var(--color-gray-900);
  margin: 0 0 24px 0;
  text-align: left;
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TodoForm = ({
  mode,
  initialValues = { name: "", time: "" },
  onSubmit,
}: TodoFormProps) => {
  const [name, setName] = useState(initialValues.name);
  const [time, setTime] = useState(initialValues.time);

  const MAX_NAME_LENGTH = 50;
  const titleText = mode === "create" ? "할 일 등록하기" : "할 일 수정하기";
  const submitButtonText = mode === "create" ? "등록하기" : "수정하기";

  const handleSubmit = () => {
    if (!name || !time) return;
    onSubmit?.({ name, time });
    setName("");
    setTime("");
  };

  const isButtonDisabled = !name || !time;

  return (
    <>
      <Title>{titleText}</Title>

      <FormContent>
        <FieldWrapper>
          <Input
            label="할 일 이름"
            placeholder="예: 영어 단어 암기"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            showCount={true}
            countPosition="top"
          />
        </FieldWrapper>

        <FieldWrapper>
          <Input
            label="목표 시간 (분)"
            type="number"
            placeholder="30"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </FieldWrapper>

        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          variant="primary"
        >
          {submitButtonText}
        </Button>
      </FormContent>
    </>
  );
};

export default TodoForm;
