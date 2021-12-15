import { Categories, ITodo, toDoState } from "atom";
import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Li = styled.li`
    width: 300px;
    border : 1px solid black;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 15px;
    background-color: #FFC312;
    h1 {
        margin-bottom: 10px;
        font-size: 20px;
        color:white;
    }
    div {
        width:100%;
        display: flex;
        justify-content: flex-end;
    }
    button {
        cursor: pointer;
        background:none;
        font-family: 'Gaegu', cursive;
        margin-right:5px;
        padding: 4px 7px;
        display:flex;
        justify-content:center;
        align-items:center;
        font-size:11px;
        border: 1px solid black;
        background-color: ${props => props.theme.bgColor};
        .fa-trash-alt {
            color:#EE5A24;
        }
        .fa-check-square {
            color:#10ac84;
        }
        .fa-spinner {
            color:#f368e0;
        }
    }
`;

function ToDo({ text, category, id }:ITodo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const { currentTarget : { name } } = event
        setToDos(oldToDos => {
            const toDoIndex = oldToDos.findIndex(toDo=> toDo.id === id);
            const oldTodo = oldToDos[toDoIndex];
            const newToDos = [...oldToDos];
            if ( name !== "delete" ) {
                const newTodo = { ...oldTodo, category : name as ITodo["category"] }
                newToDos.splice(toDoIndex, 1, newTodo); 
            }
            else {
                if (window.confirm("정말로 이 항목을 삭제해도 괜찮아요?")) {
                    newToDos.splice(toDoIndex, 1);
                }
            }
            return newToDos
        })
    };
    return (
        <Li>
        <h1>{text}</h1>
        <div>
        {category !== Categories.TO_DO && 
        <button name={Categories.TO_DO} onClick={onClick}>할 일&nbsp;<i className="fas fa-list"></i></button>}
        {category !== Categories.DOING && 
        <button name={Categories.DOING} onClick={onClick}>진행 중&nbsp;<i className="fas fa-spinner"></i></button>}
        {category !== Categories.DONE && 
        <button name={Categories.DONE} onClick={onClick}>끝낸 일&nbsp;<i className="fas fa-check-square"></i></button>}
        <button name="delete" onClick={onClick}>삭제하기<i className="fas fa-trash-alt"></i></button>
        </div>
        </Li>
    )
}

export default ToDo;

// && ? 