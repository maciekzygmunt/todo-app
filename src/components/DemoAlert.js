import styled from 'styled-components';

function DemoAlert() {
  return (
    <Wrapper>
      <Para>This is just a demo! Signup for full functionality.</Para>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2rem;
  background: #ff5e5e;
  color: white;
`;

const Para = styled.p``;

export default DemoAlert;
