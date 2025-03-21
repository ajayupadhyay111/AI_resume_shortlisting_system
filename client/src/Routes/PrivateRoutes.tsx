import { getProfile } from "@/API/authenticationAPIs";
import { setUser } from "@/store/features/user/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const PrivateRoutes = async ({children}:{children:React.ReactNode}) => {
  const {isAuthenticated} = useSelector((state:RootState)=>state.user)
  const dispatch = useDispatch<AppDispatch>();
  if(!isAuthenticated){
    const response = await getProfile()
    dispatch(setUser(response.user))
  }
  return children;
}
