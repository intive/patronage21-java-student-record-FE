import React from "react";
import PropTypes from "prop-types";
import { useRecoilValue, useSetRecoilState, useResetRecoilState } from "recoil";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItem from "@material-ui/core/ListItem";
import Avatar from "@material-ui/core/Avatar";
import { USER_INACTIVE_STATUS, MAX_MARK } from "../../config/Constants";
import {
  activeViewState,
  userProperty,
  techGroupSelectValueState,
  viewChangedState,
  showInactiveUsersState,
  alertFrameVisibleState,
} from "../../state/atoms";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core";
import { getMarksFromLogin } from "../../state/selectors";
import { IMAGE_BASE64_JPG_PREFIX } from "../../config/Constants";

const StyledListItem = styled(ListItem)`
  ${({ status }) =>
    status === USER_INACTIVE_STATUS &&
    `
    & > * {
      opacity: 0.4;
    }
  `}
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) =>
      theme.customPalette.colors.listItemHovered};
  }
  flex-wrap: wrap;
`;

const styles = makeStyles({
  tableLeft: {
    marginRight: 2,
  },
  tableRight: {
    textAlign: "right",
    marginLeft: 2,
  },
});

function UserListItem(props) {
  const classes = styles();
  const marks = useRecoilValue(getMarksFromLogin(props.user.login));
  const setLogin = useSetRecoilState(userProperty("login"));
  const setMarks = useSetRecoilState(userProperty("marks"));
  const setActiveView = useSetRecoilState(activeViewState);
  const setViewChanged = useSetRecoilState(viewChangedState);
  const resetShowAllUsers = useResetRecoilState(showInactiveUsersState);
  const setAlertFrameVisibleState = useSetRecoilState(alertFrameVisibleState);
  const resetTechGroupSelectValue = useResetRecoilState(
    techGroupSelectValueState
  );

  const getAvgMark = () =>
    Math.round(
      10 * (marks.reduce((total, mark) => total + mark) / marks.length)
    ) / 10;

  const handleClick = (login) => () => {
    setLogin(login);
    setMarks(marks);
    setActiveView("user");
    setViewChanged(true);
    resetTechGroupSelectValue();
    resetShowAllUsers();
    setAlertFrameVisibleState(false);
  };

  const user = { ...props.user };
  return (
    <StyledListItem
      status={user.status}
      key={user.login}
      divider={props.divider}
      onClick={handleClick(user.login)}
    >
      <ListItemAvatar>
        <Avatar
          alt={user.firstName}
          src={IMAGE_BASE64_JPG_PREFIX + user.image}
        />
      </ListItemAvatar>
      <ListItemText
        className={classes.tableLeft}
        primary={`${user.firstName} ${user.lastName}`}
      />
      <ListItemText
        className={classes.tableRight}
        primary={`${getAvgMark()}/${MAX_MARK}`}
      />
    </StyledListItem>
  );
}

UserListItem.propTypes = {
  divider: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

UserListItem.defaultProps = {
  divider: false,
  user: {
    firstName: "-",
    lastName: "-",
    login: "-",
    role: "-",
    status: "-",
  },
};

export default UserListItem;
