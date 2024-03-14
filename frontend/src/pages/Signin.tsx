import { Auth } from "../components/Auth"

interface SigninProps {
  onTokenChange: (isLoggedIn: boolean) => void;
}

export const Signin: React.FC<SigninProps> = ({ onTokenChange }) => {
      return (
        <Auth type={"signin"} onTokenChange={onTokenChange}/>
      )
}