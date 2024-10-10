import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import Board from "./Board";

export default function BottomBoardList({ ingredients, selectedIngredients, setSelectedIngredients, dishStatus, setDishStatus, dishIndex, setDishIndex, shuffleIngredients, dishScore, setDishScore }) {
    const [displayBoards, setDisplayBoards] = useState(Object.keys(ingredients));
    const [animating, setAnimating] = useState(false);

    const handleBoardClick = (key) => {
        if (!selectedIngredients.includes(key) && !animating) {
            const newSelectedIngredients = [...selectedIngredients, key];
            setSelectedIngredients(newSelectedIngredients);

            setAnimating(true);
            setTimeout(() => {
                const newDisplayBoards = displayBoards.filter(item => item !== key);
                setDisplayBoards(newDisplayBoards);

                const newDishStatus = dishStatus.map((status, index) => {
                    if (index === dishIndex) {
                        return status + 1;
                    }
                    return status; // 다른 인덱스의 상태는 그대로 유지
                });

                setDishStatus(newDishStatus);

                if (newDishStatus[dishIndex] === 6) {
                    console.log("Dish Completed!");
                    shuffleIngredients();
                    setSelectedIngredients([]);
                    setDisplayBoards(Object.keys(ingredients));
                    setDishIndex((dishIndex + 1) % 3);
                }

                setAnimating(false);
            }, 200); // 애니메이션 시간에 맞게 조정
        }
    };

    return (
        <Flex justifyContent="space-around">
            {dishStatus[dishIndex] < 6 && Object.keys(ingredients).map((key) => (
                <Board
                    key={key}
                    ingredient={ingredients[key]}
                    is_selected={selectedIngredients.includes(key)}
                    is_display={displayBoards.includes(key)}
                    onClick={() => handleBoardClick(key)}
                />
            ))}
        </Flex>
    );
}