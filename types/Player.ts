
export interface Player {
  id: string;
  name: string;
  class: string;
  level: number;
  race: string;
  backstory: string;
  currentLocation: string;
  healthPoints: {
    current: number;
    max: number;
  };
  manaPoints: {
    current: number;
    max: number;
  };
  items: Item[];
  avatar?: string;
}

export interface Item {
  id: string;
  name: string;
  type: 'weapon' | 'armor' | 'consumable' | 'misc';
  description: string;
  quantity: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
}

export interface PlayerStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}
