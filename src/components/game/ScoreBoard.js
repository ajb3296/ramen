import React from "react";
import { Box, Text, Image } from "@chakra-ui/react";

import ScoreBoardImg from "../../images/scoreboard.webp";

export default function ScoreBoard({ text }) {
    return (
        <Box position="relative" w="142px" h="38px">
            <Image src={ScoreBoardImg} alt="ScoreBoard" w="100%" h="100%" />
            <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color="#FDF787"
                fontWeight="bold"
                w="90%"
                textAlign="center"
            >
                {text}
            </Text>
        </Box>
    );
}