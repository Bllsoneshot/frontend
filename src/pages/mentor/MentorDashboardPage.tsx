import styled from "styled-components";
import { typography } from "../../styles/typography";

const MentorDashboardPage = () => {
  return (
    <PageContainer>
      <Title>멘토 전용 대시보드입니다.</Title>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: var(--color-white);
`;

const Title = styled.h1`
  ${typography.t24sb}
  color: var(--color-black);
`;

export default MentorDashboardPage;
