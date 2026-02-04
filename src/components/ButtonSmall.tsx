import React from "react";
import styled from "styled-components";

// 버튼 Props 정의
interface ButtonSmallProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const StyledButton = styled.button`
  /* --- 1. 레이아웃 & 크기 --- */
  width: 108px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;

  /* --- 2. 폰트 스타일 --- */
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.02em;

  /* --- 3. 색상 테마 --- */

  /* [기본 상태: Green] */
  background-color: var(--color-primary-500);
  color: white; /* 텍스트 흰색 */

  /* ★ [수정] 아이콘 스타일 (선 아이콘 기준) ★ */
  svg {
    /* 1. 안쪽 배경 흰색을 제거 (투명하게) */
    fill: none;

    /* 2. 선 색상을 텍스트 색상(currentColor)으로 설정 */
    stroke: currentColor;

    /* 혹시 path 내부에 fill이 지정되어 있을 경우 대비 */
    path {
      fill: none;
      stroke: currentColor;
    }
  }

  /* [Hover 상태] */
  &:hover:not(:disabled) {
    background-color: var(--color-primary-600);
  }

  /* [Active/Pressed 상태] */
  &:active:not(:disabled) {
    background-color: var(--color-primary-700);
  }

  /* [비활성화 상태: Gray] */
  &:disabled {
    background-color: #bdbdbd;
    color: #f5f5f5; /* 텍스트 연한 회색 */
    cursor: not-allowed;
    /* currentColor 덕분에 아이콘 선 색상도 자동으로 연한 회색이 됨 */
  }
`;

export const ButtonSmall: React.FC<ButtonSmallProps> = ({
  icon,
  children,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {icon && (
        <span style={{ display: "flex", alignItems: "center" }}>{icon}</span>
      )}
      {children}
    </StyledButton>
  );
};

export default ButtonSmall;
