import { atom, selector } from "recoil";

export enum Categories {
    "TO_DO" = "할 일",
    "DOING" = "진행 중",
    "DONE" = "끝낸 일"
}

export interface ITodo {
    text : string;
    id: number;
    category: Categories;
}

export interface ICustomCategory {
    title: string;
    id : number;
}

export const customCategoryState = atom<ICustomCategory[]>({
    key:"customCategory",
    default: []
})

export const categoryState = atom<Categories>({
    key:"category",
    default: Categories.TO_DO
})


export const toDoState = atom<ITodo[]>({
    key:"toDo",
    default: JSON.parse(localStorage.getItem("TODOS") || "[]" )
})

export const toDoSelector = selector({
    key:"toDoSelector",
    get : ({get}) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter(toDo => toDo.category === category );
    }
})

