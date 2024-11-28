import { useLocation, useNavigate } from "react-router-dom";


function useReactHooks(){
  const navigate = useNavigate()
  const location = useLocation()
  const pathname = location.pathname

  return{
    location,
    pathname,
    navigate,
  }
}

export default useReactHooks
