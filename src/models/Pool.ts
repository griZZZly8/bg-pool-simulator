import ICard, { MinionType, Tier } from "./Card";

export const MITION_TYPES_COUNT = 5;

export const MINIONS_COUNT_BY_POOL: Record<Tier, number> = {
  1: 16,
  2: 15,
  3: 13,
  4: 11,
  5: 9,
  6: 7
};

const ROLL_SIZE_BY_TIER: Record<Tier, number> = {
  1: 3,
  2: 4,
  3: 4,
  4: 5,
  5: 5,
  6: 6
};

export type GetCardResult = {
  index: number,
  card: ICard,
}

export interface IPoolSettings {
  tier: Tier;
  minionTypes: Array<MinionType>;
  duos: boolean;
}

export default class Pool {
  private allCards: ICard[];
  public cardsPool: ICard[] = [];
  
  constructor(allCards: ICard[]) {
    this.allCards = allCards;
    const t = this.allCards.map(card => new Array(MINIONS_COUNT_BY_POOL[card.tier]).fill(card));
    this.cardsPool =([] as ICard[]).concat(...t);
  }

  private getRandomIndex(pool: ICard[]) : number {
    const max = pool.length;
    return Math.floor(Math.random() * max);
  }

  private getFilteredPool(settings: IPoolSettings) : ICard[] {
    return this.cardsPool
    .filter(card => card.tier <= settings.tier)
    .filter(card => card.minionTypes.some(mType => settings.minionTypes.includes(mType)))
    .filter(card => settings.duos || !card.duosOnly);
  }

  public getRandomCards(count: number, settings: IPoolSettings) : GetCardResult[] {
    const busyIndexes: number[] = [];
    const pool = this.getFilteredPool(settings);

    return new Array(count).fill(null).map(() => {
      let index = this.getRandomIndex(pool);
      while (busyIndexes.indexOf(index) >= 0) {
        index = this.getRandomIndex(pool);
      }
      busyIndexes.push(index);

      return {
        index,
        card: pool[index]
      };
    });
  }

  public getRoll(settings: IPoolSettings) {
    return this.getRandomCards(ROLL_SIZE_BY_TIER[settings.tier], settings).map(r => r.card);
  }
}