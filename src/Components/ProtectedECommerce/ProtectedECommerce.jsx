
import { Navigate } from 'react-router-dom';
export default function ProtectedECommerce(props) {

  //console.log(props.children)
  if (localStorage.getItem('userToken') !== null ) 
  {
    return props.children;

  }
  else
  {
    return <Navigate to={'/login'}/>
  }
  
  
  
}
