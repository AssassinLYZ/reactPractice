// actions.ts
import { toggleUserStatus } from "./reducers";

export const toggleStatus = (userId: number) => {
  console.log(toggleUserStatus(userId));
  return toggleUserStatus(userId);
};
