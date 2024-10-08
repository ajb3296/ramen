import React from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";

import EmptyDishImg from "../../images/empty_dish.webp";
import Dish1Img from "../../images/ramen1.webp";
import Dish2Img from "../../images/ramen2.webp";
import Dish3Img from "../../images/ramen3.webp";
import Dish4Img from "../../images/ramen4.webp";
import Dish5Img from "../../images/ramen5.webp";
import Dish6Img from "../../images/ramen6.webp";
import Fire from "../../images/fire.webp";

export default function Dish({ dish }) {
    const dishImages = [Dish1Img, Dish2Img, Dish3Img, Dish4Img, Dish5Img, Dish6Img];

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
                <Image
                    src={dish ? dishImages[dish - 1] : EmptyDishImg}
                    alt="Dish"
                    w="70%"
                    h="70%"
                    objectFit="contain"
                />
                <Image
                    src={Fire}
                    alt="Fire"
                    w="100px"
                    h="100px"
                    mt="-50px"
                />
            </Flex>
        </Flex>
    );
}