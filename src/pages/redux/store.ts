// store.ts
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./reducers";

const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export default store;
