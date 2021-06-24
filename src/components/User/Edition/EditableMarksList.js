import React from "react";
import { useRecoilValue } from "recoil";
import { userProperty, userIsEditedState } from "../../../state/atoms";
import GroupList from "../../UI/GroupList";
import EditableMark from "./EditableMark";
import Mark from "./Mark";
import { USER_MARKS_TITLE } from "../../../config/Constants";

function EditableMarksList() {
  const marks = useRecoilValue(userProperty("marks"));
  const edited = useRecoilValue(userIsEditedState);
  const editedMarkIndex = useRecoilValue(userProperty("markIndex"));

  const stages = marks.map((item, index) =>
    edited && editedMarkIndex === index ? (
      <EditableMark key={index} item={item} index={index} />
    ) : (
      <Mark key={index} item={item} index={index} />
    )
  );

  return (
    <GroupList title={USER_MARKS_TITLE} label={marks.length}>
      {stages}
    </GroupList>
  );
}

export default EditableMarksList;
