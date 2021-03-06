import { selector, selectorFamily } from "recoil";
import { getTechGroups, getUsers } from "../client/client";
import {
  currentUserState,
  userProperty,
  lastResponseState,
  alertFrameVisibleState,
  userIsEditedState,
} from "./atoms";

export const usersQuery = selectorFamily({
  key: "users",
  get: (role) => () => getUsers(role, false),
});

export const techGroupsQuery = selector({
  key: "techGroups",
  get: () => getTechGroups(),
});

export const setCurrentUserState = selector({
  key: "setCurrentUserState",
  set: ({ get, set }) => {
    const updatedUser = {};
    Object.keys(get(currentUserState)).forEach(
      (key) => (updatedUser[key] = get(userProperty(key)))
    );
    set(currentUserState, updatedUser);
  },
});

export const getEditionTempUser = selector({
  key: "getEditionTempUser",
  get: ({ get }) => {
    const editedUser = {};
    Object.keys(get(currentUserState)).forEach(
      (key) => (editedUser[key] = get(userProperty(key)))
    );
    return editedUser;
  },
});

export const isUserDataChanged = selector({
  key: "isUserDataChanged",
  get: ({ get }) => {
    let userDataUpdated = false;
    if (get(currentUserState)) {
      userDataUpdated = Object.keys(get(currentUserState)).some((key) => {
        if (key === "image") return false;
        return get(currentUserState)[key] !== get(userProperty(key));
      });
    }
    return userDataUpdated;
  },
});

export const cancelUserEdition = selector({
  key: "cancelUserEdition",
  set: ({ get, set }) => {
    Object.keys(get(currentUserState)).forEach((key) =>
      set(userProperty(key), get(currentUserState)[key])
    );
    set(userIsEditedState, false);
    set(alertFrameVisibleState, false);
  },
});

export const setLastResponseState = selector({
  key: "setLastResponseState",
  set: ({ set }, response) => {
    let status, body;
    if (response.status) {
      status = response.status;
      body = response.body;
    } else if (response.error && response.error.message) {
      status = "error";
      body = response.error.message;
    }
    set(lastResponseState, { status, body });
  },
});

export const setUserProperties = selector({
  key: "setUserProperties",
  set: ({ get, set }) => {
    const currentUser = get(currentUserState);
    Object.keys(currentUser).forEach((key) =>
      set(userProperty(key), currentUser[key])
    );
  },
});

export const getMarksFromLogin = selectorFamily({
  key: "getMarksFromLogin",
  get: (login) => () => {
    const marks = [];
    const length = login.length;
    const marksCount = length < 3 ? length : 3;
    for (let i = 0; i < marksCount; i++) {
      marks[i] = login.charCodeAt(i) % 6;
    }
    return marks;
  },
});

export const getAvgMark = selector({
  key: "getAvgMark",
  get: ({ get }) => {
    const marks = get(userProperty("marks"));
    return (
      Math.round(
        10 * (marks.reduce((total, mark) => total + mark) / marks.length)
      ) / 10
    );
  },
});
