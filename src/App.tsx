import React, { useEffect, useState } from 'react';
import CardModel, { MinionTypeArray } from './models/Card';
import Card from './components/Card';
import Tavern from './components/Tavern';
import { MinionType } from './models/Card';
import PoolSettings from './components/PoolSettings';

export default () => {
  const [cards, setCards] = useState<CardModel[]>([]);

  useEffect(() => {
    const pageSize = 20;
    const url = 'https://api.blizzard.com/hearthstone/cards?bgCardType=minion&gameMode=battlegrounds';
    fetch(`${url}&pageSize=${pageSize}&sort=tier%3Aasc%2Cname%3Aasc&locale=en_US`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer EU0t5QWz3O8WoHLWQRj5eHMcGZIIRKUSfy'
      }
    })
    .then(r => r.json())
    .then(data => setCards(data.cards.map((card: any) => new CardModel(card))));
  }, []);

  return (
    <>
      <Tavern>
        {cards.map(card => <Card card={card}/>)}
      </Tavern>
      <PoolSettings/>
    </>
  );
};
