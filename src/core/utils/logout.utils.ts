// ** Third Party Components
import { Dispatch } from "@reduxjs/toolkit";

// ** Redux Imports
import { onUserLoggedIn } from "../../redux/user-logged-in";

// ** Core Imports
import { removeItem } from "../services/common/storage.service";

export const handleLogout = (dispatch?: Dispatch) => {
  removeItem("token");
  if (dispatch) dispatch(onUserLoggedIn(false));
  window.location.pathname = "/login";
};
