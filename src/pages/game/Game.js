import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import BackgroundImg from "../../images/game_background.webp";
import ScoreBoard from "../../components/game/ScoreBoard";
import Dish from "../../components/game/Dish";

export default function Game() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const phone = queryParams.get("phone");

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
                    <ScoreBoard text="30초" />
                    <ScoreBoard text="100점" />
                </Flex>

                <Flex justifyContent="space-around">
                    <Dish dish={1} />
                    <Dish dish={2} />
                    <Dish dish={3} />
                </Flex>

                
            </Box>
        </Flex>
    );
}