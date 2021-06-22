import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { setUserProperties } from "../../state/selectors";
import CircleProgressBar from "../UI/CircleProgressBar";
import { checkUserFetchAlerts } from "../../alerts/alertSelectors";
import MarksContainer from "./MarksContainer";
import UserHeader from "./UserHeader";
import { setLastResponseState } from "../../state/selectors";
import {
  currentUserState,
  userLoadedState,
  userProperty,
} from "../../state/atoms";
import { getUser } from "../../client/client";

function UserMarks() {
  const setCurrentUser = useSetRecoilState(currentUserState);
  const login = useRecoilValue(userProperty("login"));
  const [userLoaded, setUserLoaded] = useRecoilState(userLoadedState);
  const setResponse = useSetRecoilState(setLastResponseState);
  const setUserFetchAlerts = useSetRecoilState(checkUserFetchAlerts);
  const setUserDetails = useSetRecoilState(setUserProperties);

  useEffect(() => {
    async function fetchUser() {
      const userResponse = await getUser(login);
      setResponse(userResponse);
      setUserFetchAlerts("user");
      if (userResponse.status === 200) {
        setCurrentUser(userResponse.body.user);
        setUserLoaded(true);
        setUserDetails();
      }
    }
    fetchUser();
  }, [
    login,
    setCurrentUser,
    setUserLoaded,
    setUserDetails,
    setResponse,
    setUserFetchAlerts,
  ]);

  return userLoaded ? (
    <>
      <UserHeader />
      <MarksContainer />
    </>
  ) : (
    <Box my={25}>
      <CircleProgressBar size={200} />
    </Box>
  );
}

export default UserMarks;
