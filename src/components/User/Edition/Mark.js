import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  userProperty,
  userIsEditedState,
  alertFrameVisibleState,
} from "../../../state/atoms";
import { ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import {
  MAX_MARK,
  REASON_TITLE_TXT,
  STAGE_TXT,
} from "../../../config/Constants";
import REASONS from "../../../mocks/reasons";
import styled from "styled-components";

const RightColumn = styled(ListItemText)`
  text-align: right;
  align-self: baseline;
  width: 70px;
`;

const Grade = styled.span`
  right: 16px;
  position: absolute;
  font-weight: 600;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  right: 0;
  bottom: 15px;
  margin-left: 5px;
`;

const Reason = styled.span`
  margin: 22px 0;
  display: block;
  color: ${({ theme }) => theme.palette.text.primary};
`;

const ReasonTitle = styled.span`
  display: block;
  font-weight: 600;
`;

function Mark(props) {
  const marks = useRecoilValue(userProperty("marks"));
  const setAlertFrameVisibleState = useSetRecoilState(alertFrameVisibleState);
  const setEdited = useSetRecoilState(userIsEditedState);
  const seteditedMarkIndex = useSetRecoilState(userProperty("markIndex"));
  const item = props.item;
  const index = props.index;

  const enableEdition = () => {
    setEdited(true);
    seteditedMarkIndex(index);
    setAlertFrameVisibleState(false);
  };

  return (
    <ListItem divider={index !== marks.length - 1} key={index}>
      <ListItemText
        primary={<strong>{`${STAGE_TXT} ${index + 1}`}</strong>}
        secondary={
          <Reason>
            <ReasonTitle>{REASON_TITLE_TXT}</ReasonTitle>
            {REASONS[item]}
          </Reason>
        }
      />
      <RightColumn
        primary={<Grade>{`${item}/${MAX_MARK}`}</Grade>}
        secondary={
          <StyledIconButton aria-label="edit mark" onClick={enableEdition}>
            <EditIcon />
          </StyledIconButton>
        }
      />
    </ListItem>
  );
}

export default Mark;
