import { useContext } from "react";
import { MinionTypeArray, TierArray, Tier, MinionType } from "../models/Card";
import PoolSettingsContext from "../providers/PoolSettings";


export default () => {
    const { settings, changeSettings } = useContext(PoolSettingsContext);

    const setTier = (tier: Tier) => {
        changeSettings({ ...settings, tier });
    };

    return (
        <>
        Minions:<br/>
        {MinionTypeArray.map(minionType => <button key={minionType}>{minionType}</button>)}
        <br/><br/>
        Tavern tier ({settings.tier}):<br/>
        {TierArray.map(tier => <button key={tier} onClick={() => setTier(tier)}>{tier}</button>)}
        </>
    );
  };