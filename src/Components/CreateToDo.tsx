import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
    toDo: string;
}


function CreateToDo() {
    const setToDos = useSetRecoilState(toDoState)
    const category = useRecoilValue(categoryState)
    const { register, handleSubmit, 
        formState: { errors }, setValue
    } = useForm<IForm>({
        defaultValues: {
            toDo: "Happy Coding"
        }
    });
    const onValid = ( { toDo }: IForm) => {
        setToDos(prevToDos => [{ text:toDo, id:Date.now(), category }, ...prevToDos])
        setValue("toDo", "");
        
    }
    return (
        <form onSubmit={handleSubmit(onValid)}>
                <span>
                    {errors?.toDo?.message}
                </span>
                <input {...register("toDo", { 
                    required : "To do is required",
                    })} 
                    placeholder="Write to do" />
                <button>Add</button>
            </form>
    )
}

export default CreateToDo;