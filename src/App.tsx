import React, { useEffect, useState } from 'react';
import CardModel from './models/Card';
import Card from './components/Card';
import Tavern from './components/Tavern';
import PoolSettings from './components/PoolSettings';
import Pool from './models/Pool';
import PoolSettingsContext, { IPoolSettings, defaultSettings } from "./providers/PoolSettings";

export default () => {
  const [cards, setCards] = useState<CardModel[]>([]);
  const [pool, setPool] = useState<Pool>();
  const [poolSettings, setPoolSettings] = useState<IPoolSettings>(defaultSettings);

  useEffect(() => {
    const pageSize = 300;
    const url = 'https://api.blizzard.com/hearthstone/cards?bgCardType=minion&gameMode=battlegrounds';
    fetch(`${url}&pageSize=${pageSize}&sort=tier%3Aasc%2Cname%3Aasc&locale=en_US`, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer EU0t5QWz3O8WoHLWQRj5eHMcGZIIRKUSfy'
      }
    })
    .then(r => r.json())
    .then(data => {
      const allCards = data.cards.map((card: any) => new CardModel(card));
      const pool = new Pool(allCards);
      setPool(pool);
    });
  }, []);

  const roll = () => {
    setCards(pool!.getRoll(poolSettings.tier));
  };

  return (
    <>
      <PoolSettingsContext.Provider value={{ settings: poolSettings, changeSettings: setPoolSettings}}>
        <Tavern>
          {cards.map((card, i) => <Card key={i} card={card}/>)}
        </Tavern>
        <button onClick={roll}>Roll</button>
        <hr/>
        <PoolSettings />
      </PoolSettingsContext.Provider>
    </>
  );
};
