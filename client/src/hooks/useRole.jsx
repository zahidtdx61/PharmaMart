import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.uid, user],
    queryFn: async () => {
      const response = await axiosSecure("/user/role");
      // console.log(response.data.data.role);
      return response.data.data.role;
    },
  });

  return { isRoleLoading: isLoading, role };
};

export default useRole;
