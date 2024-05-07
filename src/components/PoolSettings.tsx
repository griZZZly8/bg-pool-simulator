import { useContext } from "react";
import { Flex, Tag, Typography, Switch, Divider } from 'antd';
import { MinionTypeArray, TierArray, Tier, MinionType } from "../models/Card";
import PoolSettingsContext from "../providers/PoolSettings";
import { MITION_TYPES_COUNT } from "../models/Pool";

const { Title } = Typography;

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

    const toggleDuos = () => {
        changeSettings({ ...settings, duos: !settings.duos });
    };

    return (
        <>
        <Divider orientation="left">Minions ({settings.minionTypes.length} of {MITION_TYPES_COUNT})</Divider>
        {MinionTypeArray.map(minionType => (
            <Tag.CheckableTag
                key={minionType}
                checked={settings.minionTypes.includes(minionType)}
                onChange={() => clickMinionType(minionType)}>
            {minionType}
          </Tag.CheckableTag>
        ))}
        <Divider orientation="left">Tavern tier</Divider>
        {TierArray.map(tier => (
            <Tag.CheckableTag
                key={tier}
                checked={settings.tier === tier}
                onChange={() => setTier(tier)}>
            {tier}
        </Tag.CheckableTag>
        ))}
        <Divider orientation="left">Duos</Divider>
        <Switch size="small" checked={settings.duos} onChange={toggleDuos}/>
        </>
    );
  };