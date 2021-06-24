import React from "react";
import { useRecoilValue } from "recoil";
import { userProperty, userIsEditedState } from "../../../state/atoms";
import { ListItem } from "@material-ui/core";
import GroupList from "../../UI/GroupList";
import ListItemText from "@material-ui/core/ListItemText";
import {
  USER_MARKS_TITLE,
  MAX_MARK,
  REASON_TITLE_TXT,
  STAGE_TXT,
} from "../../../config/Constants";
import REASONS from "../../../mocks/reasons";
import styled from "styled-components";

const MarksListItem = styled(ListItem)`
  align-items: baseline;
`;

const Mark = styled(ListItemText)`
  flex: unset;
  margin-left: 2;
`;

const Reason = styled.div`
  margin: 15px 0;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const ReasonTitle = styled.span`
  display: block;
  font-weight: 600;
`;

function EditableMarksList() {
  const edited = useRecoilValue(userIsEditedState);
  const marks = useRecoilValue(userProperty("marks"));

  const editMarks = () => null;

  const displayMarks = () => {
    return marks.map((item, index) => (
      <MarksListItem divider={index !== marks.length - 1} key={index}>
        <ListItemText
          primary={<strong>{STAGE_TXT} {index + 1}</strong>}
          secondary={
            <Reason>
              <ReasonTitle>{REASON_TITLE_TXT}</ReasonTitle>
              {REASONS[item]}
            </Reason>
          }
        />
        <Mark primary={<strong>{`${item}/${MAX_MARK}`}</strong>} />
      </MarksListItem>
    ));
  };

  return (
    <>
      {edited ? (
        <GroupList title={USER_MARKS_TITLE} label={marks.length}>
          {editMarks()}
        </GroupList>
      ) : (
        <GroupList title={USER_MARKS_TITLE} label={marks.length}>
          {displayMarks()}
        </GroupList>
      )}
    </>
  );
}

export default EditableMarksList;
