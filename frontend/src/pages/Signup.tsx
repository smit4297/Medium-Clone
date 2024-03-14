import { Auth } from "../components/Auth"
interface SignupProps {
    onTokenChange: (isLoggedIn: boolean) => void;
  }
  
  export const Signup: React.FC<SignupProps> = ({ onTokenChange }) => {
    return (
        <Auth type={"signup"} onTokenChange={onTokenChange}/>
    )
}
  
  
  



