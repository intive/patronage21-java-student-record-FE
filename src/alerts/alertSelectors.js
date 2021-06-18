import { selector } from "recoil";
import {
  alertFrameVisibleState,
  lastResponseState,
  alertState,
} from "../state/atoms";
import {
  ERROR,
  GENERAL_ERROR_MSG,
  APP_ERROR_MSG,
  NO_CONNECTION_MSG,
  SERVER_ERROR_MSG,
} from "../config/AlertConstants";

export const checkSearchAlerts = selector({
  key: "checkSearchAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const lastAlertCaller = get(alertState).caller;
    const alert = {};

    switch (status) {
      case 200:
      case 422:
        if (lastAlertCaller === caller) {
          set(alertFrameVisibleState, false);
        }
        break;
      case 404:
        setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
        break;
      default:
        checkCommonErrors(status, content, alert);
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
    }
  },
});

export const checkGroupsFetchAlerts = selector({
  key: "checkGroupsFetchAlerts",
  set: ({ get, set }, caller) => {
    const status = get(lastResponseState).status;
    const content = get(lastResponseState).body;
    const lastAlertCaller = get(alertState).caller;
    const alert = {};

    switch (status) {
      case 200:
        if (lastAlertCaller === caller) {
          set(alertFrameVisibleState, false);
        }
        break;
      case 404:
        setAlert(alert, ERROR, NO_CONNECTION_MSG, "");
        alert.caller = caller;
        set(alertFrameVisibleState, true);
        set(alertState, alert);
        break;
      default:
        checkCommonErrors(status, content, alert, caller);
        set(alertFrameVisibleState, true);
    }
    set(alertState, alert);
  },
});

const checkCommonErrors = (status, content, alert) => {
  switch (status) {
    case "error":
      setAlert(alert, ERROR, APP_ERROR_MSG, content);
      break;
    default:
      const firstChar = (status + "")[0];
      if (firstChar === "5") {
        setAlert(alert, ERROR, SERVER_ERROR_MSG, "");
      } else {
        setAlert(alert, ERROR, GENERAL_ERROR_MSG, "");
      }
  }
};

const setAlert = (alert, severity, title, content, caller) => {
  alert.severity = severity;
  alert.title = title;
  alert.content = content;
  alert.caller = caller;
};
