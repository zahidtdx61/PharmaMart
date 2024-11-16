import { useQuery } from "@tanstack/react-query";
import LoadContent from "../components/Loader/LoadContent";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Avatar } from "@mui/joy";

const MyProfile = () => {
  const session = useAxiosSecure();
  const { user, isLoading } = useAuth();

  const { photoURL, displayName, email } = user || {};

  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await session.get("/user/profile");
      return response.data.data;
    },
  });

  if (userLoading || isLoading) return <LoadContent />;

  // console.log(userData, user);
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div>
        <h1 className="text-4xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-2 border-primary-green">
          My Profile
        </h1>
        <h2 className="font-fira-sans text-center text-primary-teal mt-4">
          Here you can see your profile details.
        </h2>
      </div>

      <div className="mt-6">
        <div className="">
          <div className="flex flex-col items-center">
            <Avatar src={photoURL} alt={displayName} size="lg" />
          </div>
          <div className="mx-auto w-fit mt-12">
            <h3 className="text-lg font-semibold mt-4">{displayName}</h3>
            <h3 className="text-lg font-semibold">Email: {email}</h3>
            <h3 className="text-lg font-semibold capitalize">
              Role: {userData.role}
            </h3>
            <h3 className="text-lg font-semibold capitalize">
              Registered At: {new Date(userData.createdAt).toLocaleDateString()}
            </h3>
            {userData.role === "vendor" && (
              <h3 className="text-lg font-semibold capitalize">
                Added Medicine: {userData.medicines.length}
              </h3>
            )}
          </div>

          {userData.role === "vendor" && (
            <div className="mt-8 text-center">
              <h2 className="text-xl font-semibold text-primary-teal text-center border-b-2 w-fit mx-auto px-2 py-1 border-primary-green">
                Medicine List
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                {userData?.medicines.map((medicine) => (
                  <div
                    key={medicine._id}
                    className="flex gap-8 p-2 border-[1px] border-primary-green rounded-lg"
                  >
                    <div className="flex items-center size-32">
                      <img
                        src={medicine.image}
                        alt={medicine.name}
                        className="object-center"
                      />
                    </div>
                    <div className="text-left text-sm lg:text-base">
                      <h3> Medicine Name: {medicine.name}</h3>
                      <h3>Price Per Unit (BDT): {medicine.pricePerUnit}</h3>
                      <h3>Stock: {medicine.quantity}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
