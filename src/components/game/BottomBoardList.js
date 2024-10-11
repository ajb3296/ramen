import React, { useState } from "react";
import { Flex } from "@chakra-ui/react";
import Board from "./Board";

export default function BottomBoardList({ ingredients,
    selectedIngredients, // 선택된 재료들
    setSelectedIngredients, // 선택된 재료들을 업데이트하는 함수
    dishStatus, // 각 요리에 들어간 재료 수
    setDishStatus, // 각 요리에 들어간 재료 수를 업데이트하는 함수
    dishIndex, // 현재 그릇 인덱스
    setDishIndex, // 현재 그릇 인덱스를 업데이트하는 함수
    shuffleIngredients, // ingredients를 섞어주는 함수
    dishScore, // 각 그릇의 임시 점수
    setDishScore // 각 그릇의 임시 점수를 업데이트하는 함수
}) {
    const [displayBoards, setDisplayBoards] = useState(Object.keys(ingredients));
    const [animating, setAnimating] = useState(false);

    const correctAnswer = ['water', 'soup', 'flake', 'noodle', 'green_onion', 'egg'];

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
                    setDisplayBoards(Object.keys(ingredients));
                    
                    // correctAnswer에서 틀린만큼 100점에서 10점씩 차감
                    let score = 100;
                    for (let i = 0; i < 6; i++) {
                        if (correctAnswer[i] !== ingredients[newSelectedIngredients[i]]) {
                            score -= 10;
                        }
                    }
                    const newDishScore = [...dishScore];
                    newDishScore[dishIndex] = score;
                    setDishScore(newDishScore);
                    
                    shuffleIngredients();
                    setSelectedIngredients([]);
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