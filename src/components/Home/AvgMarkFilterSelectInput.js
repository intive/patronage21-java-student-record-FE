import React from "react";
import { useRecoilState } from "recoil";
import { avgMarkFilterSelectValueState } from "../../state/atoms";
import SelectInput from "../UI/SelectInput";
import {
  DROPDOWN_MARK_FROM_HIGHEST_VALUE,
  DROPDOWN_MARK_FROM_LOWEST_VALUE,
} from "../../config/Constants";

function AvgMarkFilterSelectInput() {
  const [selectValue, setSelectValue] = useRecoilState(
    avgMarkFilterSelectValueState
  );

  const markFilter = [
    DROPDOWN_MARK_FROM_HIGHEST_VALUE,
    DROPDOWN_MARK_FROM_LOWEST_VALUE,
  ];

  const handleChange = (event) => {
    setSelectValue(event.target.value);
  };

  return (
    <SelectInput
      list={markFilter}
      value={selectValue}
      handleChange={handleChange}
    />
  );
}

export default AvgMarkFilterSelectInput;
