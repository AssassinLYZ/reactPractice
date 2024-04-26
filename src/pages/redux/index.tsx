// UserList.tsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleStatus } from "./actions";
// import { RootState } from "./reducers";

interface User {
  id: number;
  name: string;
  active: boolean;
}

const UserList: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: { users: { users: User[] } }) => {
    console.log(state);
    return state.users.users;
  });

  const handleToggle = (userId: number) => {
    dispatch(toggleStatus(userId));
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user.id}>
            {user.name} - {user.active ? "Active" : "Inactive"}
            <button onClick={() => handleToggle(user.id)}>Toggle Status</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
