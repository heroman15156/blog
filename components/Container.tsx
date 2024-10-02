'use client';

import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textColor};
  padding: 20px;
  min-height: 100vh; /* 화면 전체 높이를 채우도록 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease; /* 다크 모드 전환 시 부드러운 전환 */
`;
