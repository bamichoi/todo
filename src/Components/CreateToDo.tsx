import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";
import styled from "styled-components";

const Form = styled.form`
    margin-bottom: 40px;
    display:flex;
    align-items:center;
    background-color:#FFC312;
    padding:10px;
    border-radius:10px;
    input {
        height : 40px;
        width: 250px;
        margin-right: 5px;
        border-radius: 5px;
        border: none;
        padding: 0 10px;
        font-size: 20px;
        font-family: 'Gaegu', cursive;
    }
    button {
        cursor: pointer;
        background:none;
        height:40px;
        font-family: 'Gaegu', cursive;
        border-radius: 10px;
        border:1px solid black;
        background-color: ${props => props.theme.bgColor};
        
    }
`

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState)
    const category = useRecoilValue(categoryState)
    const { register, handleSubmit, 
        formState: { errors }, setValue
    } = useForm<IForm>({
    });
    const onValid = ( { toDo }: IForm) => {
        setToDos(prevToDos => [{ text:toDo, id:Date.now(), category }, ...prevToDos])
        setValue("toDo", "");
        
    }
    return (
        <Form onSubmit={handleSubmit(onValid)}>
                <span>
                    {errors?.toDo?.message}
                </span>
                <input {...register("toDo", { 
                    required : "To do is required",
                    })} 
                    placeholder="새로운 할 일을 적어주세요" />
                <button>추가</button>
            </Form>
    )
}

export default CreateToDo;