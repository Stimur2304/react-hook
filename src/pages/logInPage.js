import React, { useState } from 'react'
import{useForm} from "react-hook-form";
import { axiosInstance } from '../API';
import {useNavigate} from "react-router-dom"
import "./logInPage.css"
import svg from "../pages/Vectors.png"

const LogInPage = () => {
  const[invalid,setInvalid] = useState(false)
  const[server,setServer] = useState(false)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState:{errors},
    reset 
  } = useForm({mode:"onChange"})
  const onSubmit = async(data) =>{
    try{
      const response = await axiosInstance.post('/login',data)
      localStorage.setItem("data",JSON.stringify(response.data.user))
      const Data  = JSON.parse(localStorage.getItem("data"))
      console.log(Data)
      console.log(response)
      if(response.status === 200){
        console.log(response.data.message)
        navigate("HomePage")
        setInvalid(false)
        setServer(false)
      }
    }catch(e){
      if(e.response.status === 401){
        reset()
        setInvalid(true)
      } else  if(e.response.status === 404){
        reset()
        setServer(true)
      }
    }
  }

  return (
    <div className="App">
      <h1 className='header'>Sign in </h1>

      <div className='important'>
      <form onSubmit={handleSubmit(onSubmit )}>
        <input  {...register('username', {
          required:"Name can not be empty",
          minLength: {
            value:5,
            message:"You have to use more than 4 symblos"
          },
          maxLength:{
            value:18,
            message:"You must not use more than  18 symbols"
          }
        })} 
        
        type="text"   
        placeholder='Put your login' 
        className='input' 
        />
        {errors?.username&& 

        (<div >{errors.username.message}</div>)
        }

        <input 
        {...register('password', {
          required:"Password can not be empty",
          minLength: {
            value:5,
            message:"You have to use more than 4 symblos"
          },
         
        })} 

        type="password"  
        placeholder='Put your password' 
        className='input '  
        />
        {errors?.password&& 
        
        (<div>{errors.password.message}</div>)
        }


        
        <button>Log in</button>
        {invalid?<div className='error_401'>Your login or password is incorrect</div>:null}
        {server?<div className='error_401'>Unfortunatly,server isn't working now</div>:null}
      </form>
      </div>
      <div className='pic-div'>
      <img className='pic' src={svg} alt="Photo" />
      </div>
    </div>
  );
 }

export default LogInPage;