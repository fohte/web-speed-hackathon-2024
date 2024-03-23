import { useEffect, useRef } from 'react';
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
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // fix aspect
  useEffect(() => {
    const handleResize = () => {
      if (!wrapperRef.current || !imageRef.current) return;
      const aspectRatio = 16 / 9;
      const width = wrapperRef.current.clientWidth;
      const height = Math.floor(width / aspectRatio);
      wrapperRef.current.style.paddingTop = `${height}px`;
      imageRef.current.style.height = `${height}px`;
    };
    handleResize();

    window.addEventListener('resize', handleResize);

    // イベントリスナーをクリーンアップする
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <_Wrapper ref={wrapperRef}>
      <_Image ref={imageRef} src="https://assets-wsh2024.fohte.net/hero.webp" alt="Cyber TOON" />
    </_Wrapper>
  );
};
