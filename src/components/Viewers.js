import React from "react";
import styled from "styled-components";

const Viewers = () => {
  return (
    <>
      <Container>
        <Wrap>
          <img src="/images/viewers-disney.png" alt="viewers" />
        </Wrap>
      </Container>
    </>
  );
};

export default Viewers;

const Container = styled.div`
  margin-top: 30px;
  display: grid;
  grid-gap: 25px;
  padding: 30px 0px 26px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
`;

const Wrap = styled.div`
  border-radius: 10px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0/ 69%) 0px 26px 30px -10px,
    rbg(0 0 0 / 73%) 0px 16px 10px -10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
