// reducers.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  active: boolean;
}

interface UsersState {
  users: User[];
}

const initialState: UsersState = {
  users: [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true },
  ],
};

const usersSlice = createSlice({
  name: "users2",
  initialState,
  reducers: {
    toggleUserStatus(state, action: PayloadAction<number>) {
      // state.users = state.users.map((user) =>
      //   user.id === action.payload ? { ...user, active: !user.active } : user
      // );

      const user = state.users.find((item) => item.id === action.payload);
      user!.active = !user?.active;
    },
  },
});

console.log(usersSlice);
export const { toggleUserStatus } = usersSlice.actions;
export default usersSlice.reducer;
