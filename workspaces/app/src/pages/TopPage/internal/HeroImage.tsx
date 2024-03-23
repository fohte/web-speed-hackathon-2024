import styled from 'styled-components';

const _Wrapper = styled.div`
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
  position: relative;
`;

const _Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
`;

export const HeroImage: React.FC = () => {
  return (
    <_Wrapper>
      <_Image src="https://assets-wsh2024.fohte.net/hero.webp" alt="Cyber TOON" />
    </_Wrapper>
  );
};
