import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

import Dish1Img from "../../images/ramen1.webp";
import Dish2Img from "../../images/ramen2.webp";
import Dish3Img from "../../images/ramen3.webp";
import Dish4Img from "../../images/ramen4.webp";
import Dish5Img from "../../images/ramen5.webp";
import Dish6Img from "../../images/ramen6.webp";
import Fire from "../../images/fire.webp";

export default function Dish({ 
    id, // 현재 그릇 인덱스
    dish, // 현재 그릇 이미지 번호
    score, // 현재 점수
    setScore, // 점수 변경 함수
    addScore, // 클릭 시 추가되는 점수
    dishScore, // 각 그릇의 임시 점수
    setDishScore, // 각 그릇의 임시 점수를 업데이트하는 함수
    dishStatus, // 각 요리에 들어간 재료 수
    setDishStatus // 각 요리에 들어간 재료 수를 업데이트하는 함수
}) {
    const dishImages = [Dish1Img, Dish2Img, Dish2Img, Dish2Img, Dish3Img, Dish4Img, Dish5Img, Dish6Img];
    const [isClickable, setIsClickable] = useState(false);
    const [clickText, setClickText] = useState("CLICK!");
    const [isLastDish, setIsLastDish] = useState(false);

    useEffect(() => {
        let timer;
        if (dish === 6) {
            timer = setTimeout(() => {
                setIsClickable(true);
                setIsLastDish(true);
            }, 2000); // 2초 후에 클릭 가능
        }

        return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머 정리
    }, [dish]);

    function click() {
        if (isClickable) {
            console.log("Dish clicked!");
            setClickText(`+${addScore}`); // 클릭 시 텍스트 변경
            setScore(score + addScore); // 점수 추가

            // 임시 점수에 이 그릇만 0점으로 만들기
            let newDishScore = [...dishScore];
            newDishScore[id] = 0;
            setDishScore(newDishScore);

            // 각 요리에 들어간 재료 수 중 이 그릇만 0으로 만들기
            let newDishStatus = [...dishStatus];
            newDishStatus[id] = 0;
            setDishStatus(newDishStatus);

            // 1초 후에 텍스트를 다시 "CLICK!"으로 변경
            setIsLastDish(false);
            let timer = setTimeout(() => {
                setIsClickable(false);
                setClickText("CLICK!");
            }, 1000); // 1초 후에 클릭 불가능

            return () => clearTimeout(timer);
        }
    }

    return (
        <Flex
            position="relative"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
        >
            <Flex
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                {/* 라면 이미지 */}
                <Image
                    src={isLastDish ? dishImages[7] : dishImages[dish]}
                    alt="Dish"
                    w="70%"
                    h="70%"
                    objectFit="contain"
                    onClick={click}
                    cursor={isClickable ? "pointer" : "not-allowed"} // 클릭 가능 여부에 따라 커서 변경
                />

                {/* CLICK 텍스트 */}
                <Text
                    color="#FF3701"
                    fontSize="50px"
                    mt="-120px"
                    onClick={click}
                    opacity={isClickable ? 1 : 0} // 클릭 가능 시에만 보이도록
                    cursor={isClickable ? "pointer" : "not-allowed"} // 클릭 가능 여부에 따라 커서 변경
                >
                    {clickText}
                </Text>

                {/* 불 */}
                <Image
                    src={Fire}
                    alt="Fire"
                    w="100px"
                    h="100px"
                    mt="0px"
                />
            </Flex>
        </Flex>
    );
}