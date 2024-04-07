export type MinionType = 'mech' | 'elemental' | 'murloc' | 'demon' | 'pirate' | 'beast' | 'dragon' | 'naga' | 'undead' | 'quillboar';

const MinionTypeMap : Record<number, MinionType> = {
  17: 'mech',
  18: 'elemental',
  14: 'murloc',
  20: 'beast',
  15: 'demon',
  23: 'pirate',
  24: 'dragon',
  92: 'naga',
  11: 'undead',
  43: 'quillboar'
};

export default class Card {
  constructor(cardJson: any) {
    this.name = cardJson.name;
    this.image = cardJson.image;
    this.tier = cardJson.battlegrounds.tier;
    this.minionTypes = Card.extractMinionTypes(cardJson);
  }

  private static extractMinionTypes(cardJson: any) : MinionType[] {
    return [MinionTypeMap[cardJson.minionTypeId], MinionTypeMap[cardJson.multiTypeIds?.[0]]]
    .filter(mType => mType !== undefined);
  } 

  name: string;
  image: string;
  tier: number;
  minionTypes: MinionType[];
}