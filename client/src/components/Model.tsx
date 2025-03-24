import { AppDispatch } from "@/store/store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { logout } from "@/API/authenticationAPIs";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/features/user/userSlice";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const Modal = ({
    openDialog,
    setOpenDialog,
  }: {
    openDialog: boolean;
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const handleLogout = async () => {
      try {
        setIsLoading(true);
        const response = await logout();
        if (response.message) {
          toast.success(response.message);
          setOpenDialog(false);
          setIsLoading(false);
          localStorage.removeItem("accessToken");
          navigate("/login");
          dispatch(logoutUser());
          return;
        }
      } catch (error) {
        console.log(error);
      }
      setOpenDialog(false);
      setIsLoading(false);
    };
    return (
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-gray-900">
          <DialogHeader>
            <DialogTitle>Are you sure you want to logout?</DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-500 text-white w-[72px]"
              onClick={handleLogout}
            >
              {isLoading ? (
                <div className="border-b-2 border-white w-5 h-5 rounded-full animate-spin"></div>
              ) : (
                "Logout"
              )}
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  };