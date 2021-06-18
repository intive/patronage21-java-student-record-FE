import React, { useEffect, useState, useRef } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import PropTypes from "prop-types";
import GroupList from "../UI/GroupList";
import UserListItem from "./UserListItem";
import {
  activeViewState,
  techGroupSelectValueState,
  viewChangedState,
  showInactiveUsersState,
} from "../../state/atoms";
import { usersQuery, setLastResponseState } from "../../state/selectors";
import { checkSearchAlerts } from "../../alerts/alertSelectors";
import { getUsers } from "../../client/client";
import styled from "styled-components";
import { HOME_SEARCH_NO_RESULTS } from "../../config/Constants";
import CircleProgressBar from "../UI/CircleProgressBar";

export const NoResults = styled.div`
  text-align: center;
  font-size: 20px;
  width: 100%;
  margin: 40px 0;
`;

function UserList(props) {
  const activeView = useRecoilValue(activeViewState);
  const viewChanged = useRecoilValue(viewChangedState);
  const showInactiveUsers = useRecoilValue(showInactiveUsersState);
  const selectedGroup = useRecoilValue(techGroupSelectValueState);
  const [usersLoaded, setUsersLoaded] = useState(true);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setSearchAlerts = useSetRecoilState(checkSearchAlerts);
  const firstUpdate = useRef(true);
  const [usersResponse, setUsersResponse] = useState(
    useRecoilValue(usersQuery(props.role))
  );
  const users = usersResponse.body.users;

  useEffect(() => {
    setResponse(usersResponse);
    setSearchAlerts(props.title);
  }, [usersResponse, setSearchAlerts, setResponse, props.title]);

  useEffect(() => {
    if (firstUpdate.current && !viewChanged) {
      firstUpdate.current = false;
      return;
    }
    setUsersLoaded(false);
    async function fetchUsers() {
      const searchedUserData = null;
      const searchParams = [showInactiveUsers, searchedUserData, selectedGroup];
      setUsersResponse(await getUsers(props.role, ...searchParams));
      setUsersLoaded(true);
    }
    fetchUsers();
  }, [activeView, viewChanged, selectedGroup, showInactiveUsers, props.role]);

  const usersList = users.map((user, index) => (
    <UserListItem
      user={user}
      key={user.login}
      divider={index !== users.length - 1}
    />
  ));

  return (
    <GroupList label={"Średnia ocen"} title={props.title}>
      {usersLoaded ? (
        users.length > 0 ? (
          usersList
        ) : (
          <NoResults>{HOME_SEARCH_NO_RESULTS}</NoResults>
        )
      ) : (
        <CircleProgressBar size={30} containerHeight={200} />
      )}
    </GroupList>
  );
}

UserList.propTypes = {
  title: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
};

UserList.defaultProps = {
  title: "Tytuł",
  role: "CANDIDATE",
};

export default UserList;
