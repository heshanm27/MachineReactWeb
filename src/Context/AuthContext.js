import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth ,storage} from '../init/firebaseinit'

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  confirmPasswordReset,
} from 'firebase/auth'



const AuthContext = createContext({
  currentUser: null,
  register: () => Promise,
  login:()=>Promise,
  logout:()=>Promise,
  ForgotPassword:()=>Promise
})

export const useAuth = () => useContext(AuthContext)

export default function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)


  useEffect(()=>{
      const unscubcribe = onAuthStateChanged(auth,user=>{
          setCurrentUser(user)
      })

      return ()=>{
          unscubcribe()
      }
  },[])
  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email,password){
      return signInWithEmailAndPassword(auth,email,password)
  }
  function logout(){
      return signOut(auth)
  }

  function ForgotPassword(email){
      return sendPasswordResetEmail(auth,email,{url:'http://localhost:3000/login'})
  }


  const value ={
      currentUser,
      register,
      login,
      logout,
      ForgotPassword
  }
 
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}