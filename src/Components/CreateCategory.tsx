import { customCategoryState, ICustomCategory } from "atom";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";


interface IForm {
    customCategory: string;
}

function CreateCategory() {
    const setCustomCategory = useSetRecoilState(customCategoryState)
    const { register, handleSubmit, setValue } = useForm();
    const onValid = ({ customCategory }:IForm) => {
        setCustomCategory(prevCategories => [ {title:customCategory, id:Date.now()}, ...prevCategories])
        setValue("customCategory", "")
    }
    return(
        <form onSubmit={handleSubmit(onValid)}>
            <input {...register("customCategory")} placeholder="Make your category" />
            <button>Create</button>
        </form>
    )
}

export default CreateCategory