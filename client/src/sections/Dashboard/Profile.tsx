import { useRef, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    image: "https://i.pravatar.cc/150?img=3", // Dummy Profile Image
  });

  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [imagePreview, setImagePreview] = useState(user.image);
  const inputRef = useRef<HTMLInputElement>(null);
  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setUpdatedUser({ ...updatedUser, image: imageUrl });
    }
  };

  // Update user profile
  const handleUpdate = () => {
    setUser(updatedUser);

  };
  return (
    <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col items-center">
        <img
          src={user.image}
          alt="User Avatar"
          className="w-24 h-24 rounded-full border-4 border-gray-500 shadow-md object-cover"
        />
        <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
        <p className="text-gray-300 text-sm">{user.email}</p>

        {/* ShadCN Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="mt-5 bg-blue-500 hover:bg-blue-600">Edit Profile</Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="flex flex-col items-center">
                <img src={imagePreview} onClick={()=>inputRef.current?.click()} alt="Preview" className="w-20 h-20 rounded-full border-2 border-gray-400 shadow-md object-cover" />
                <input ref={inputRef} hidden type="file" accept="image/*" className="mt-2 text-sm" onChange={handleImageUpload} />
              </div>

              {/* Name & Email Inputs */}
              <Input name="name" value={updatedUser.name} onChange={handleChange} placeholder="Enter Name" />
              <Input name="email" value={updatedUser.email} onChange={handleChange} placeholder="Enter Email" />
              <Button onClick={handleUpdate} className="w-full bg-green-500 hover:bg-green-600">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Profile
