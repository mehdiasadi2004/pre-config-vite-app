// ** Core Imports
import { ROLES } from "../data/panel/roles.data";

export const renderUserRoles = (isExpanded: boolean, userRoles: string[]) => {
  if (isExpanded) {
    return userRoles
      .slice(0, 2)
      .map((role) => ROLES[role])
      .join("، ");
  } else return userRoles.map((role) => ROLES[role]).join("، ");
};
