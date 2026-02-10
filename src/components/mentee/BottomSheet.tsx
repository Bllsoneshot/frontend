import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Overlay = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transition: opacity 0.3s ease;
`;

const BottomSheetWrapper = styled.div.attrs<{
  $isOpen: boolean;
  $dragY: number;
  $isDragging: boolean;
}>(({ $isOpen, $dragY }) => ({
  style: {
    transform: $isOpen ? `translateY(${$dragY}px)` : "translateY(100%)",
  },
}))<{
  $isOpen: boolean;
  $dragY: number;
  $isDragging: boolean;
}>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: ${({ $isDragging }) =>
    $isDragging ? "none" : "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)"};
`;

const Container = styled.div`
  width: 100%;
  min-height: 349px;
  height: auto;
  background-color: var(--color-white);
  border-radius: 20px 20px 0 0;
  padding: 12px 16px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.05);
`;

const HandleBarArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 24px;
  cursor: grab;
  margin-top: -10px;
  padding-top: 10px;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;

const HandleBar = styled.div`
  width: 36px;
  height: 4px;
  background-color: var(--color-gray-200);
  border-radius: 2px;
`;

const DRAG_CLOSE_THRESHOLD = 80;

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const startYRef = useRef(0);
  const currentDyRef = useRef(0);

  // 바텀시트가 닫힐 때 dragY 초기화
  useEffect(() => {
    if (!isOpen) {
      // 렌더링 직후가 아니라, 잠깐의 텀을 두고 실행하여 충돌 방지
      // CSS transition 시간(0.3s)만큼 기다렸다가 초기화하면 애니메이션 측면에서도 더 안전함
      const timer = setTimeout(() => {
        setDragY(0);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();

    startYRef.current = e.clientY;
    currentDyRef.current = 0;
    setIsDragging(true);

    const onMove = (e2: PointerEvent) => {
      const dy = Math.max(0, e2.clientY - startYRef.current);
      currentDyRef.current = dy;
      setDragY(dy);
    };

    const onUp = () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);

      setIsDragging(false);

      if (currentDyRef.current > DRAG_CLOSE_THRESHOLD) {
        onClose();
      } else {
        setDragY(0);
      }
    };

    document.addEventListener("pointermove", onMove);
    document.addEventListener("pointerup", onUp);
    document.addEventListener("pointercancel", onUp);
  };

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <BottomSheetWrapper
        $isOpen={isOpen}
        $dragY={dragY}
        $isDragging={isDragging}
      >
        <Container>
          <HandleBarArea onPointerDown={handlePointerDown}>
            <HandleBar />
          </HandleBarArea>
          {children}
        </Container>
      </BottomSheetWrapper>
    </>
  );
};

export default BottomSheet;
