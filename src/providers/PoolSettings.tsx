import {createContext} from 'react';
import { MinionType, Tier } from '../models/Card';

export interface IPoolSettings {
  tier: Tier;
  minionTypes: Array<MinionType>;
  duos: boolean;
}

interface IPoolSettingsProps {
  settings: IPoolSettings;
  changeSettings: (settings: IPoolSettings) => void
}

export const defaultSettings: IPoolSettings = {
  tier: 1,
  minionTypes: ['beast', 'demon', 'dragon', 'elemental', 'mech'],
  duos: false
};

export default createContext<IPoolSettingsProps>({
  settings: defaultSettings,
  changeSettings: () => {},
});