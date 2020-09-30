import React from "react";
import Checkbox from "../Checkbox";
import "./style.scss";
import { useQueryParam, StringParam } from "use-query-params";

export interface CollectionSelectorsProps {
  house: boolean;
  setHouse: (x: boolean) => void;
  senate: boolean;
  setSenate: (x: boolean) => void;
}

const CollectionSelectors = ({
  house,
  setHouse,
  senate,
  setSenate,
}: CollectionSelectorsProps): React.ReactElement => {
  return (
    <div className="collection-checkboxes">
      <div className="senate">
        <Checkbox checked={senate} setChecked={setSenate} label="Senate" />
      </div>
      <div className="house">
        <Checkbox setChecked={setHouse} checked={house} label="House" />
      </div>
    </div>
  );
};

export default CollectionSelectors;
