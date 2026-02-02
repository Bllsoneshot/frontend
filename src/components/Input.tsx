import { forwardRef, useState, useId } from "react";
import styled from "styled-components";
import type { InputProps, InputStatus } from "../@types/InputType";
import { typography } from "../styles/typography";
import { colors } from "../styles/colors";

const InputContainer = styled.div<{
  $status: InputStatus;
  $isFocused: boolean;
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  height: 44px;
  padding: 10px 12px;
  gap: 12px;
  border-radius: 4px;
  background-color: ${({ $disabled }) =>
    $disabled ? colors.gray100 : colors.white};
  border: 1px solid
    ${({ $status, $isFocused, $disabled }) => {
      if ($disabled) return colors.gray200;
      if ($status === "error") return colors.error;
      if ($isFocused) return colors.primary500;
      return colors.gray200;
    }};
  box-sizing: border-box;
  transition: border-color 0.2s ease-in-out;

  &:hover {
    border-color: ${({ $status, $disabled }) =>
      $disabled
        ? colors.gray200
        : $status === "error"
        ? colors.error
        : colors.primary500};
  }
`;

const StyledInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  ${typography.t16r};
  color: ${colors.black};
  background: transparent;
  padding: 0;
  width: 100%;
  &::placeholder {
    color: ${colors.gray300};
  }
  &:disabled {
    cursor: not-allowed;
    color: ${colors.gray300};
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.gray300};
  & > svg path {
    stroke: currentColor;
  }
  font-size: 24px;
  min-width: 24px;
`;

const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  padding: 0 4px;
  font-size: 12px;
`;

const Message = styled.span<{ $status: InputStatus }>`
  color: ${({ $status }) => ($status === "error" ? colors.error : colors.black)};
`;

const Count = styled.span`
  color: ${colors.gray300};
  margin-left: auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  color: ${colors.black};
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      id,
      status = "default",
      helperText,
      leftIcon,
      rightIcon,
      value,
      showCount = false,
      maxLength,
      disabled,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div style={{ width: "100%" }}>
        {label && <Label htmlFor={inputId}>{label}</Label>}

        <InputContainer
          $status={status}
          $isFocused={isFocused}
          $disabled={disabled}
        >
          {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}

          <StyledInput
            ref={ref}
            id={inputId}
            maxLength={maxLength}
            disabled={disabled}
            value={value}
            onFocus={(e) => {
              if (disabled) return;
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...props}
          />

          {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
        </InputContainer>

        {(helperText || showCount) && (
          <BottomWrapper>
            {helperText && <Message $status={status}>{helperText}</Message>}
            {showCount && (
              <Count>
                {String(value ?? "").length}
                {maxLength ? ` / ${maxLength}` : ""}
              </Count>
            )}
          </BottomWrapper>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
