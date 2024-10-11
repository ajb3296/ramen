import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

export default function Rank({ rank, name, score }) {
    return (
        <Flex
            alignItems="center"
            fontSize="25px"
            gap="25px"
            mt="-5px"
        >
            <Text
                bgGradient="linear(to-b, #FF7528, #FFFFFF)"
                bgClip="text"
            >
                {rank}위
            </Text>
            <Text
                bgGradient="linear(to-b, #FF7528, #FFFFFF)"
                bgClip="text"
            >
                {name}
            </Text>
            <Text
                bgGradient="linear(to-b, #CA1F00, #FF7528)"
                bgClip="text"
            >
                {score}점
            </Text>
        </Flex>
    );
}