import { useState } from "react";
import SignUp from "./components/SignUp";
import UserContext from "./context/UserContext";

const App = () =>{
  const[user, setUser] = useState(null);
  return (
    <div>
      <UserContext.Provider value={{user, setUser}}>
        <SignUp />
      </UserContext.Provider>
    </div>
  );
}

export default App;