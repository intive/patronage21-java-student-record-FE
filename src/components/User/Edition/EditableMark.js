import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userProperty, userIsEditedState } from "../../../state/atoms";
import { ListItem } from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import SelectInput from "../../UI/SelectInput";
import { TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import SaveIcon from "@material-ui/icons/Save";
import Grid from "@material-ui/core/Grid";
import {
  USER_REASON_PLACEHOLDER,
  REASON_TITLE_TXT,
  STAGE_TXT,
} from "../../../config/Constants";
import REASONS from "../../../mocks/reasons";
import styled from "styled-components";

const RightColumn = styled(ListItemText)`
  align-self: baseline;
  width: 70px;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    width: 100%;
    height: 60px;
  }
`;

const MarksDropdownContainer = styled.span`
  max-width: 65px;
  display: block;
  right: 16px;
  position: absolute;
  ${({ theme }) => theme.breakpoints.down("xs")} {
    left: 16px;
    bottom: 29px;
  }
`;

const SaveIconButton = styled(IconButton)`
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
  font-size: 16px;
  margin-top: 7px;
  display: block;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
`;

function EditableMark(props) {
  const marks = useRecoilValue(userProperty("marks"));
  const [selectedValue, setSelectedValue] = useState(props.item);
  const [reason, setReason] = useState(REASONS[props.item]);
  const setEdited = useSetRecoilState(userIsEditedState);
  const index = props.index;

  const handleReasonChange = (event) => setReason(event.target.value);
  const handleMarkChange = (event) => setSelectedValue(event.target.value);
  const saveData = () => {
    setEdited(false);
  };

  const editableReason = (
    <TextField
      component={"span"}
      value={reason ? reason : ""}
      variant={"outlined"}
      label={REASON_TITLE_TXT}
      placeholder={USER_REASON_PLACEHOLDER}
      multiline
      fullWidth
      onChange={handleReasonChange}
    />
  );

  const marksDropdown = (
    <MarksDropdownContainer>
      <SelectInput
        list={[0, 1, 2, 3, 4, 5]}
        value={selectedValue}
        handleChange={handleMarkChange}
      />
    </MarksDropdownContainer>
  );

  const saveButton = (
    <SaveIconButton aria-label="edit mark" onClick={saveData}>
      <SaveIcon />
    </SaveIconButton>
  );

  return (
    <ListItem divider={index !== marks.length - 1} key={index}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={10} md={10}>
          <ReasonTitle>{`${STAGE_TXT} ${index + 1}`}</ReasonTitle>
          <Reason>{editableReason}</Reason>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <RightColumn primary={marksDropdown} secondary={saveButton} />
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default EditableMark;
