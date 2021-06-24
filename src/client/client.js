import {
  HOME_DROPDOWN_DEFAULT_VALUE,
  USER_ACTIVE_STATUS,
} from "../config/Constants";
const Frisbee = require("frisbee");

const api = new Frisbee({
  baseURI: process.env.REACT_APP_USER_MODULE_URL,
  headers: {
    Accept: "application/json",
  },
  mode: "cors",
});

export const getTechGroups = async () => {
  try {
    const response = await api.get("/groups", {});
    if (!response.body.groups) {
      response.body.groups = [];
    }
    return response;
  } catch (error) {
    const response = { error, body: { groups: [] } };
    return response;
  }
};

export const getUsers = async (role, showAllUsers, searchedUserData, group) => {
  try {
    let params;
    if (searchedUserData && searchedUserData.length > 0) {
      params = { other: searchedUserData };
    }
    if (group && group !== HOME_DROPDOWN_DEFAULT_VALUE) {
      params = { technologyGroup: group, ...params };
    }
    if (showAllUsers === false) {
      params = { status: USER_ACTIVE_STATUS, ...params };
    }
    const response = await api.get("/users", {
      body: { role: role, ...params },
    });
    if (response.body.users) {
      return response;
    } else {
      response.body.users = [];
      return response;
    }
  } catch (error) {
    const response = { error, body: { users: [] } };
    return response;
  }
};

export const getUser = async (login) => {
  let response;
  try {
    response = await api.get(`/users/${login}`);
    if (!response.body.user) {
      response.body.user = {};
    }
  } catch (error) {
    response = { error, body: { user: {} } };
  } finally {
    return response;
  }
};