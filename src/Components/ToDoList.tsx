import {
  Categories,
  categoryState,
  customCategoryState,
  toDoSelector,
  toDoState,
} from "atom";
import React, { useEffect, useState } from "react";
import CreateToDo from "./CreateToDo";
import { selector, useRecoilState, useRecoilValue } from "recoil";
import ToDo from "./ToDo";
import CreateCategory from "./CreateCategory";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const Title = styled.div`
  font-size: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  font-weight: 500;
`;

const CategoryDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-self: center;
  margin-bottom: 30px;

  div {
    font-size: 20px;
    height: 30px;
    display: flex;
    align-items: center;
  }
  select {
    height: 30px;
    width: 70px;
    font-family: "Gaegu", cursive;
    border: none;
    border-radius: 5px;
    margin-right: 10px;
    option {
      text-align: center;
    }
  }
`;

const CategoryTitle = styled.h1`
  margin-bottom: 30px;
  font-size: 20px;
`;

const Ul = styled.ul`
  height: 100%;
  margin-bottom: 50px;
`;
const Footer = styled.div`
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

function ToDoList() {
  const allToDos = useRecoilValue(toDoState);
  const toDos = useRecoilValue(toDoSelector);
  const customCategories = useRecoilValue(customCategoryState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setCategory(value as any);
  };
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(allToDos));
  }, [allToDos]);
  return (
    <>
      <Wrapper>
        <Title>오늘의 할 일🍊</Title>
        <CategoryDiv>
          <div>분류:&nbsp;</div>
          <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>할 일</option>
            <option value={Categories.DOING}>진행 중</option>
            <option value={Categories.DONE}>끝낸 일</option>
            {customCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
          <CreateCategory />
        </CategoryDiv>
        <CreateToDo />
        <CategoryTitle>{category}</CategoryTitle>
        <Ul>
          {toDos.map((toDo) => (
            <ToDo key={toDo.id} {...toDo} />
          ))}
        </Ul>
      </Wrapper>
      <Footer>&copy; 2021 To Do Arancia by Bami All rights reserved.</Footer>
    </>
  );
}

export default ToDoList;
