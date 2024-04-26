import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

interface User {
  id: number;
  name?: string;
  active: boolean;
}

const getUsers = async (): Promise<User[]> => {
  // 模拟从后端获取用户数据
  console.log("getUsers");
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 模拟延迟
  return [
    { id: 1, name: "Alice", active: true },
    { id: 2, name: "Bob", active: false },
    { id: 3, name: "Charlie", active: true },
  ];
};

const toggleUserStatus = async (
  userId: number,
  active: boolean
): Promise<User> => {
  console.log(active);
  // 模拟更新用户状态
  await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟
  console.log(`User ${userId} status toggled to ${active}`);
  // 返回更新后的用户状态
  return { id: userId, active: !active };
};

const UserList: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery<User[]>("users", getUsers);

  const mutation = useMutation(
    (data: { userId: number; active: boolean }) =>
      toggleUserStatus(data.userId, data.active),
    {
      onSuccess: (data) => {
        // 更新本地数据
        console.log(data);
        queryClient.setQueryData<User[]>("users", (oldUsers) => {
          if (!oldUsers) return [];
          return oldUsers.map((user) => {
            if (user.id === data.id) {
              console.log(data);
              return Object.assign(user, data);
            }
            return user;
          });
        });
      },
    }
  );
  const toggleStatus = async (userId: number, active: boolean) => {
    // 更新本地数据
    await mutation.mutateAsync({ userId, active });

    // // 模拟调用后端 API 更新用户状态
    // const updatedUser = await toggleUserStatus(userId, active);

    // // 更新本地数据
    // queryClient.setQueryData<User[]>("users", (oldUsers) => {
    //   if (!oldUsers) return [];
    //   return oldUsers.map((user) => {
    //     if (user.id === userId) {
    //       return updatedUser;
    //     }
    //     return user;
    //   });
    // });

    // 使查询无效，以便在下次渲染时重新获取数据
    // queryClient.invalidateQueries("users");
    // queryClient.refetchQueries(["users"]);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users!.map((user) => (
          <li key={user.id}>
            {user.name} - {user.active ? "Active" : "Inactive"}
            <button onClick={() => toggleStatus(user.id, user.active)}>
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
