import React, { useEffect, useState } from 'react';
import styled from 'styled-components'

import CardModel from '../models/Card';

interface ICardProps {
  card: CardModel;
}

const Wrapper = styled.div`
  color: red;
  font-size: 1rem;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  height: 200px;
`

export default ({card} : ICardProps) => {
  return (
    <Wrapper>
      <Image src={card.image} />
      <div>{card.name}</div>
      <div>{card.tier}</div>
      <div>{card.minionTypes.join(', ')}</div>
    </Wrapper>
  );
};