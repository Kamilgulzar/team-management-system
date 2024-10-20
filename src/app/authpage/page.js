"use client"
import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, db, addDoc, collection, getDocs, query, where } from '../database/firebase-config';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

const AuthPage = () => {
   const [isSignUp, setIsSignUp] = useState(true); 
   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);

      if (isSignUp) {
         // Check if the user already exists in Firestore
         const q = query(collection(db, "users"), where("email", "==", email));
         const querySnapshot = await getDocs(q);
         if (!querySnapshot.empty) {
            setLoading(false);
            Swal.fire({
               title: 'Error!',
               text: 'User already exists, please log in!',
               icon: 'error',
               confirmButtonText: 'Login instead'
            });
            setIsSignUp(false); 
            return;
         }

        
         createUserWithEmailAndPassword(auth, email, password)
         .then(async (userCredential) => {
            const user = userCredential.user;

            
            await addDoc(collection(db, "users"), {
               name,
               email,
               userId: user.uid
            });

            setLoading(false);
            Swal.fire({
               title: 'Signed Up!',
               text: 'You are onboard now',
               icon: 'success',
               confirmButtonText: 'Go to dashboard'
            });
            router.push('/dashboard'); 
         })
         .catch((error) => {
            setLoading(false);
            Swal.fire({
               title: 'Sign-Up Failed!',
               text: error.message,
               icon: 'error',
               confirmButtonText: 'Try again'
            });
         });
      } else {
         // Login logic
         signInWithEmailAndPassword(auth, email, password)
         .then(async (userCredential) => {
            const user = userCredential.user;

            
            const q = query(collection(db, "users"), where("email", "==", email));
            const querySnapshot = await getDocs(q);
            if (querySnapshot.empty) {
               setLoading(false);
               Swal.fire({
                  title: 'Error!',
                  text: 'No user found, please sign up!',
                  icon: 'error',
                  confirmButtonText: 'Sign Up instead'
               });
               setIsSignUp(true); 
               return;
            }

            setLoading(false);
            Swal.fire({
               title: 'Login Successful!',
               text: 'Welcome back!',
               icon: 'success',
               confirmButtonText: 'Go to dashboard'
            });
            router.push('/dashboard'); 
         })
         .catch((error) => {
            setLoading(false);
            Swal.fire({
               title: 'Login Failed!',
               text: error.message,
               icon: 'error',
               confirmButtonText: 'Try again'
            });
         });
      }
   }

   return (
      <div className='fixed inset-0 flex flex-col items-center justify-center z-50 bg-gray-800 bg-opacity-75'>
         <h1 className='text-xl font-bold mb-4 text-white'>{isSignUp ? 'Sign Up for Team Management System' : 'Login to Team Management System'}</h1>
         <div className='flex flex-col relative bg-white rounded-lg shadow-lg p-6 max-w-md w-full'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
               <h2 className="text-xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>

               {isSignUp && (
                  <div>
                     <label className='font-sans p-4'>Name</label>
                     <input className='border p-3 w-half rounded-lg' onChange={(e) => setName(e.target.value)} value={name} type='text' placeholder='Enter your Name' />
                  </div>
               )}

               <div>
                  <label className='font-sans p-4'>Email</label>
                  <input className='border p-3 w-half rounded-lg' onChange={(e) => setEmail(e.target.value)} value={email} type='email' placeholder='Enter your Email' />
               </div>

               <div>
                  <label className='font-sans p-1'>Password</label>
                  <input className='border p-3 w-half rounded-lg' onChange={(e) => setPassword(e.target.value)} value={password} type='password' placeholder='Enter your Password' />
               </div>

               {loading ? (<div>Loading...</div>) : <button type='submit' className='px-1 w-50 py-1 rounded-lg transition-transform duration-200 border border-white bg-black text-white hover:bg-slate-400 hover:scale-75 cursor-pointer'>{isSignUp ? 'Sign Up' : 'Login'}</button>}

               <p className='text-center mt-4'>
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button type='button' onClick={() => setIsSignUp(!isSignUp)} className='text-blue-500 underline ml-2'>
                     {isSignUp ? 'Login' : 'Sign Up'}
                  </button>
               </p>
            </form>
         </div>
      </div>
   );
}

export default AuthPage;
