import { useContext } from "react";
import { MinionTypeArray, TierArray, Tier, MinionType } from "../models/Card";
import PoolSettingsContext from "../providers/PoolSettings";


export default () => {
    const { settings, changeSettings } = useContext(PoolSettingsContext);

    const setTier = (tier: Tier) => {
        changeSettings({ ...settings, tier });
    };

    const clickMinionType = (type: MinionType) => {
        const mTypes = settings.minionTypes;
        if (mTypes.includes(type)) {
            changeSettings({ ...settings, minionTypes: mTypes.filter(t => t !== type)});
        } else {
            if (mTypes.length < 5) {
                changeSettings({ ...settings, minionTypes: [...mTypes, type]});
            }
        }
    };

    return (
        <>
        Minions ({settings.minionTypes.join('|')}):<br/>
        {MinionTypeArray.map(minionType => <button key={minionType} onClick={() => clickMinionType(minionType)}>{minionType}</button>)}
        <br/><br/>
        Tavern tier ({settings.tier}):<br/>
        {TierArray.map(tier => <button key={tier} onClick={() => setTier(tier)}>{tier}</button>)}
        </>
    );
  };