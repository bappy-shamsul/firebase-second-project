// import { GoogleAuthProvider } from 'firebase/auth/web-extension';
import './App.css'
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './Firebase/Firebase.config';
import { useState } from 'react';
// import { GithubAuthProvider } from 'firebase/auth/web-extension';

const auth = new getAuth(app);
console.log(app)
const googleProvider = new GoogleAuthProvider()
const gitHubProvider = new GithubAuthProvider()

function App() {
  const [user, setUser] = useState(null);

  const handleGoogleSignIn = () =>{
    signInWithPopup(auth, googleProvider)
    .then(result =>{
      const loggedUser = result.user;
      setUser(loggedUser)
      console.log(loggedUser, 'mama clicked')
    })

    .catch(error =>{
      console.log(error)
    })
  }
const handleSignOut = () =>{
  signOut(auth)
  .then(result =>{
    console.log(result)
    setUser(null)
  })
  .catch(error =>{
    console.log(error)
  })
}

const handleGitHubSignIn = () =>{
  signInWithPopup(auth, gitHubProvider)
  .then(result =>{
    const loggedGitUser = result.user;
    console.log(loggedGitUser);
    setUser(loggedGitUser)
  })
  .catch(error =>{
    console.log(error)
  })
}
  return (
    <>

      <h1>FireBase Campaign</h1>
     {
      user ? <button onClick={handleSignOut}>Sign-Out</button> :
      <div>
      <button onClick={handleGoogleSignIn}>Sign-In Google</button>
      <button onClick={handleGitHubSignIn}>Sign-In Git-Hub</button>
      
    </div>
     }
    {
      user && <div>
        <h2>User Name: {user.displayName}</h2>
        <h2>Email: {user.email}</h2>
        <h2>Status: {user.emailVerified}</h2>
        <img src={user.photoURL}></img>
      </div>
    }
    </>
  )
}

export default App
