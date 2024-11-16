import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const ManageUsers = () => {
  const session = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: users,
    isLoading: userLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.uid],
    queryFn: async () => {
      const response = await session.get("/admin/all-users");
      return response.data.data;
    },
  });

  const { mutateAsync: changeRole, isLoading: mutationLoading } = useMutation({
    mutationFn: async (data) => {
      const { role, userId } = data;
      // console.log(role, userId);
      const response = await session.put(`/admin/update-user/${userId}`, {
        role,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("User Updated Successfully");
      refetch();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong!!! Please try later.");
    },
  });

  const handleRoleChange = async (role, userId) => {
    const data = { role, userId };
    // console.log(userId);
    await changeRole(data);
  };

  if (userLoading || mutationLoading) return <LoadContent />;
  // console.log(users);

  return (
    <div className="max-w-screen-lg mx-auto">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          Manage All Users
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          Here you can manage users.
        </h2>
      </div>

      <div className="overflow-auto p-2 text-sm lg:text-base">
        <table className="w-full mt-6 text-center">
          <thead>
            <tr className="bg-primary-teal text-white">
              <th className="py-2 px-1">S.No.</th>
              <th className="py-2 px-1">Name</th>
              <th className="py-2 px-1">Email</th>
              <th className="py-2 px-1">Role</th>
              <th className="py-2 px-1">Registered At</th>
              <th className="py-2 px-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="border-b-2">
                <td className="py-2 px-1">{index + 1}</td>
                <td className="py-2 px-1">{user.name}</td>
                <td className="py-2 px-1">{user.email}</td>
                <td className="py-2 px-1 capitalize">{user.role}</td>
                <td className="py-2 px-1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-1 flex flex-col gap-2">
                  <button
                    onClick={() => handleRoleChange("admin", user._id)}
                    className={`${
                      user.role === "admin" && "cursor-not-allowed opacity-50"
                    } px-2 py-1 bg-sky-400 text-zinc-100 rounded-md hover:opacity-70`}
                    disabled={user.role === "admin"}
                  >
                    Make Admin
                  </button>
                  <button
                    onClick={() => handleRoleChange("vendor", user._id)}
                    className={`${
                      ["admin", "vendor"].indexOf(user?.role) >= 0 &&
                      "cursor-not-allowed opacity-50 "
                    } px-2 py-1 bg-green-800 text-white rounded-md hover:opacity-70`}
                    disabled={["admin", "vendor"].indexOf(user?.role) >= 0}
                  >
                    Make Vendor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
