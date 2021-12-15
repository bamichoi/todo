import { Categories, ITodo, toDoState } from "atom";
import React from "react";
import { useSetRecoilState } from "recoil";

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
                if (window.confirm("This todo would be deleted, ok?")) {
                    newToDos.splice(toDoIndex, 1);
                }
            }
            return newToDos
        })
    };
    return (
        <li>
        <span>{text}</span>
        {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
        {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
        {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
        <button name="delete" onClick={onClick}>delete</button>
        </li>
    )
}

export default ToDo;

// && ? 