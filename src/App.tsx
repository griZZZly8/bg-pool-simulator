import React, { useEffect, useState } from 'react';
import { ConfigProvider, Layout, Flex, Button } from 'antd';
import CardModel from './models/Card';
import Card from './components/Card';
import PoolSettings from './components/PoolSettings';
import Pool from './models/Pool';
import PoolSettingsContext, { IPoolSettings, defaultSettings } from "./providers/PoolSettings";
import theme from './theme';

const { Content } = Layout;

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

  useEffect(() => {
    if (pool) {
      roll();
    }
  }, [pool]);

  const roll = () => {
    setCards(pool!.getRoll(poolSettings));
  };

  return (
    <ConfigProvider theme={theme}>
      <PoolSettingsContext.Provider value={{ settings: poolSettings, changeSettings: setPoolSettings}}>
        <Layout>
          <Content style={{ padding: '48px' }}>
            <Flex>
              {cards.map((card, i) => <Card key={i} card={card}/>)}
            </Flex>
            <Button type='primary' onClick={roll}>Roll</Button>
            <PoolSettings />
          </Content>
        </Layout>
        
      </PoolSettingsContext.Provider>
    </ConfigProvider>
  );
};
