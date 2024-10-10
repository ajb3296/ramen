import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import BottomBoardList from "../../components/game/BottomBoardList";

import BackgroundImg from "../../images/game_background.webp";
import ScoreBoard from "../../components/game/ScoreBoard";
import Dish from "../../components/game/Dish";

export default function Game() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const phone = queryParams.get("phone");
    
    const [score, setScore] = React.useState(0);
    const [time, setTime] = React.useState(30);

    const [dishStatus, setDishStatus] = React.useState([0, 0, 0])
    const [dishIndex, setDishIndex] = useState(0);
    const [dishScore, setDishScore] = useState([0, 0, 0]);

    // 선택된 재료들을 저장하는 state
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const [ingredients, setIngredients] = React.useState({
        1: "egg",
        2: "flake",
        3: "green_onion",
        4: "water",
        5: "noodle",
        6: "soup"
    });

    // ingredients를 섞어주는 함수
    const shuffleIngredients = () => {
        const ingredientArray = Object.values(ingredients);
        for (let i = ingredientArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [ingredientArray[i], ingredientArray[j]] = [ingredientArray[j], ingredientArray[i]];
        }
        const shuffledIngredients = ingredientArray.reduce((acc, ingredient, index) => {
            acc[index + 1] = ingredient;
            return acc;
        }, {});
        setIngredients(shuffledIngredients);
    };

    // 컴포넌트가 처음 렌더링될 때 shuffleIngredients 함수를 한 번 실행
    useEffect(() => {
        shuffleIngredients();
    }, []);

    return (
        <Flex
            backgroundImage={`url(${BackgroundImg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="100vh"
            justifyContent="center"
        >
            <Box
                height="100%"
            >
                <Flex justifyContent="center" gap="16px" mt="15px">
                    <ScoreBoard text={name} />
                    <ScoreBoard text={`${time}초`} />
                    <ScoreBoard text={`${score}점`} />
                </Flex>

                <Flex justifyContent="space-around">
                    {
                        dishStatus.map((status, index) => (
                            <Dish key={index} dish={status} />
                        ))
                    }
                </Flex>
                <Box
                    position="absolute"
                    bottom="0px"
                >
                    <BottomBoardList ingredients={ingredients} selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients} dishStatus={dishStatus} setDishStatus={setDishStatus} dishIndex={dishIndex} setDishIndex={setDishIndex} shuffleIngredients={shuffleIngredients} dishScore={dishScore} setDishScore={setDishScore} />
                </Box>
            </Box>
        </Flex>
    );
}