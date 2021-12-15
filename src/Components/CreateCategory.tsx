import { customCategoryState, ICustomCategory } from "atom";
import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from  "styled-components";


const Form = styled.form`
    display:flex;
    input {
        height: 30px;
        width:110px;
        border: none;
        border-radius: 5px;
        font-family: 'Gaegu', cursive;
        padding: 0 10px;
    }
`;


const Button = styled.button`
    cursor: pointer;
    background-color: ${props => props.theme.bgColor};
    border: none;
    i {
        font-size: 25px;
        color: #009432;
    }

`;


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
        <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("customCategory")} placeholder="새 카테고리 추가" />
            <Button><i className="fas fa-plus-square"></i></Button>
        </Form>
    )
}

export default CreateCategory