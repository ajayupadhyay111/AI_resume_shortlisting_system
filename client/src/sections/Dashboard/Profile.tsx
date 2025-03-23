import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { RootState } from "@/store/store";
import { setUser } from "@/store/features/user/userSlice";
import { updateProfile } from "@/API/authenticationAPIs";

interface UserData {
  name: string;
  email: string;
}

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  const [updatedUser, setUpdatedUser] = useState<UserData>({
    name: user?.name ?? "",
    email: user?.email ?? "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Update user profile
  const handleUpdate = async () => {
    if (!updatedUser.name?.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    try {
      const response = await updateProfile({
        ...updatedUser,
      });
      if (response.success) {
        dispatch(setUser({ ...updatedUser }));
        toast.success(response.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white h-full flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
          <img src="https://static.vecteezy.com/system/resources/thumbnails/004/607/791/small_2x/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy-human-psychological-portrait-positive-emotions-user-avatar-for-app-web-design-vector.jpg" alt="" />
        </div>
        <h2 className="text-2xl font-semibold mt-4">{user?.name}</h2>
        <p className="text-gray-300 text-sm mb-4">{user?.email}</p>

        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Edit Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input
                name="name"
                value={updatedUser.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
              <Input
                name="email"
                value={updatedUser.email}
                onChange={handleChange}
                placeholder="Enter Email"
                disabled
              />
              <Button
                onClick={handleUpdate}
                disabled={isLoading || !updatedUser.name.trim()}
                className={`w-full ${
                  isLoading || !updatedUser.name.trim()
                    ? "bg-yellow-400 cursor-not-allowed"
                    : "bg-yellow-500 hover:bg-yellow-600"
                }`}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile;
