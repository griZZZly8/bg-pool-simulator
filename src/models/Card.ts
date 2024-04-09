export const MinionTypeArray = ['mech', 'elemental', 'murloc', 'demon', 'pirate', 'beast', 'dragon', 'naga', 'undead', 'quillboar'];
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

// Do we need T7 ???
export type Tier = 1 | 2 | 3 | 4 | 5 | 6;

export default class Card {
  public name: string;
  public image: string;
  public tier: Tier;
  public minionTypes: MinionType[];

  constructor(cardJson: any) {
    this.name = cardJson.name;
    this.image = cardJson.image;
    this.tier = cardJson.battlegrounds.tier;
    this.minionTypes = Card.extractMinionTypes(cardJson);
  }

  public get isNeutral() : boolean {
    return this.minionTypes.length === 0;
  }

  private static extractMinionTypes(cardJson: any) : MinionType[] {
    return [MinionTypeMap[cardJson.minionTypeId], MinionTypeMap[cardJson.multiTypeIds?.[0]]]
    .filter(mType => mType !== undefined);
  } 
}