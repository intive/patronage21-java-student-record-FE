import React from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Content from "../Layout/Content";
import {
  activeViewState,
  userLoadedState,
  alertFrameVisibleState,
  currentUserState,
} from "../../../state/atoms";
import { cancelUserEdition } from "../../../state/selectors";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import {
  BREADCRUMBS_HOME,
  BREADCRUMBS_STUDENT_RECORD,
  USER_PANEL_MODULE_URL,
} from "../../../config/Constants";
import styled from "styled-components";

const NavLink = styled(Link)`
  cursor: pointer;
  color: inherit;
`;

function UserBreadcrumbs() {
  const [activeView, setActiveView] = useRecoilState(activeViewState);
  const [userLoaded, setUserLoaded] = useRecoilState(userLoadedState);
  const setAlertFrameVisibleState = useSetRecoilState(alertFrameVisibleState);
  const cancelEdition = useSetRecoilState(cancelUserEdition);
  const currentUser = useRecoilValue(currentUserState);
  const user = `${currentUser.firstName} ${currentUser.lastName} (${currentUser.login})`;

  const breadCrumbItems = {
    users: {
      text: BREADCRUMBS_STUDENT_RECORD,
      view: "home",
    },
    user: {
      text: user,
      view: "user",
    },
  };

  const breadcrumbsInView = {
    home: [breadCrumbItems.users],
    user: [breadCrumbItems.users, breadCrumbItems.user],
  };

  const handleClick = (view) => () => {
    if (activeView === "user") setUserLoaded(false);
    setActiveView(view);
    setAlertFrameVisibleState(false);
    cancelEdition();
  };

  const createLink = (text, view) => (
    <NavLink key={text} onClick={handleClick(view)}>
      {text}
    </NavLink>
  );

  const changingBreadcrumbs = breadcrumbsInView[activeView].map(
    (item, index, breadcrumbs) => {
      return index !== breadcrumbs.length - 1 ? (
        createLink(item.text, item.view)
      ) : (
        <Typography color="textPrimary" key={item.text}>
          {item.text}
        </Typography>
      );
    }
  );

  return (
    (userLoaded || activeView === "home") && (
      <Content>
        <Breadcrumbs
          separator={<NavigateNextIcon color="primary" fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link color="inherit" href={USER_PANEL_MODULE_URL}>
            {BREADCRUMBS_HOME}
          </Link>
          {changingBreadcrumbs}
        </Breadcrumbs>
      </Content>
    )
  );
}

export default UserBreadcrumbs;
