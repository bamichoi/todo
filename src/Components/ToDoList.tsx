import { Categories, categoryState, customCategoryState, toDoSelector, toDoState } from "atom";
import React, { useEffect, useState } from "react";
import CreateToDo from "./CreateToDo";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";
import styled from "styled-components";

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    align-items: center; 
`;

const Title = styled.div`
    font-size : 30px;
    margin-top: 30px;
    margin-bottom :30px;
    font-weight:500;
    
`;

const CategoryDiv = styled.div`
    display:flex;
    justify-content:space-between;
    align-self: center;
    margin-bottom : 30px;
    
    div {
        font-size:20px;
        height:30px;
        display:flex;
        align-items:center;
    }
    select {
        height: 30px;
        width: 70px;
        font-family: 'Gaegu', cursive;
        border:none;
        border-radius:5px;
        margin-right: 10px;
        option {
         text-align:center;
        }
       

    }
`;

const CategoryTitle = styled.h1`
    margin-bottom: 30px;
    font-size:20px;

`;

const Footer = styled.footer`
    position:fixed;
    bottom: 20px;
`;

function ToDoList() {
    const allToDos = useRecoilValue(toDoState)
    const toDos = useRecoilValue(toDoSelector);
    const customCategories = useRecoilValue(customCategoryState)
    const [ category, setCategory ] = useRecoilState(categoryState);
    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        const { currentTarget : { value }} = event;
        setCategory(value as any);
    }
    useEffect(() => {
        localStorage.setItem("TODOS", JSON.stringify(allToDos))
    }, [allToDos])
    return <Wrapper>
            <Title>오늘의 할 일🍊</Title>
            <CategoryDiv>
                <div>분류:&nbsp;</div>
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>할 일</option>
                    <option value={Categories.DOING}>진행 중</option>
                    <option value={Categories.DONE}>끝낸 일</option>
                    {customCategories.map(category => (
                        <option key={category.id} value={category.title}>{category.title}</option>
                    ))}
                </select>
                <CreateCategory />
            </CategoryDiv>
            <CreateToDo />
            <CategoryTitle>{category}</CategoryTitle>
            <ul>
                {toDos.map(toDo => (
                    <ToDo key={toDo.id} {...toDo}/>
                    ))}
            </ul>
            <Footer>
                &copy; 2021 To Do Arancia All rights reserved.
            </Footer>
    </Wrapper>
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


// with react-hook-form!
/* 
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
} */