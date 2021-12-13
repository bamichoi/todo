import { string } from "prop-types";
import React, { useState } from "react"
import { useForm } from "react-hook-form"

// with react-hook-form!


interface IForm {
    toDo: string;
    password: string;
    password2: string;
    extraError?: string;
}

function ToDoList() {
    const { register, handleSubmit, 
        formState: { errors }, setError 
    } = useForm<IForm>({
        defaultValues: {
            toDo: "Happy Coding"
        }
    });
    const onValid = (data: IForm) => {
        if (data.password !== data.password2) {
            setError("password", { message : "Passwords does not match"}, {shouldFocus:true})
        }
        //setError("extraError", { message : "server offline"})
    }
    console.log(errors)
    return <div style={{display:"flex", justifyContent:"center",}}>
        <form onSubmit={handleSubmit(onValid)}>
            <span>
                {errors?.toDo?.message}
            </span>
            <input {...register("toDo", { 
                required : "To do is required",
                validate : (value)=> value.includes("pain") ? "no pain allowed" : true,
                pattern : {
                    value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                    message: "only naver.com email allowed"
                },
                minLength: {
                value:5, 
                message:"value is too short!"
                } 
                })} 
                placeholder="Write to do" />
            <span>
                {errors?.password?.message}
            </span>
            <input {...register("password", { 
                required : "password is required",
                minLength : 5 
            },    
            )} placeholder="passowrd" />
            <input {...register("password2", { 
                required : "password2 is required",
                minLength : 5 
            },    
            )} placeholder="passowrd2" />
            <button>Add</button>
        </form>
    </div>
}

export default ToDoList


// witout react-hook-form
/* 
function ToDoList() {
    const [ toDo, setToDo ] = useState("");
    const [ todoError, setToDoError ] = useState("");
    const onChange = (event:React.FormEvent<HTMLInputElement>) => {
        const {currentTarget : { value } } = event;
        setToDo(value);
        setToDoError("");   
    }
    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(toDo.length < 10){
            setToDoError("To do should be longer")
        }
        console.log("submit");
    }
    return <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={toDo} placeholder="Write to do" />
            <button>Add</button>
            {todoError !== "" ? todoError : null }
        </form>
    </div>
} */



