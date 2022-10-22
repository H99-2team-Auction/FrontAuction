import styled from 'styled-components';

const StpostContainer = styled.div`
  margin: 0 auto;
`;
const StpostHeader = styled.div`
  width: 500px;
  height: 70px;
  background-color: black;
`;

export default function Home() {
  return (
    <>
      <StpostContainer>
        <StpostHeader>상품</StpostHeader>
      </StpostContainer>
    </>
  );
}
