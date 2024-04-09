import { MinionTypeArray } from "../models/Card";

export default () => {
    return (
        <>
        {MinionTypeArray.map(minionType => <button>{minionType}</button>)}
        </>
    );
  };