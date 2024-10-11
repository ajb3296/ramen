import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Text, Image, Button } from "@chakra-ui/react";

import Rank from "../../components/ranking/Rank";

import Fire from "../../images/fire.webp";
import Restart from "../../images/restart_button.webp";

export default function Ranking() {
    const navigate = useNavigate();

    const [rank, setRank] = useState([
        { name: "안재범", score: 700 },
        { name: "안재범", score: 600 },
        { name: "안재범", score: 500 },
        { name: "안재범", score: 400 },
        { name: "안재범", score: 300 },
    ])

    return (
        <Flex backgroundColor="black" height="100vh" justifyContent="center" alignItems="center" flexDirection="column">

            <Flex justifyContent="center" alignItems="center" >
                <Image src={Fire} alt="fire" w="50px" h="50px" />
                <Text
                    bgGradient="linear(to-b, #FF7528, #FFFFFF)"
                    bgClip="text"
                    fontSize="30px"
                >
                    Ranking
                </Text>
                <Image src={Fire} alt="fire" w="50px" h="50px" />
            </Flex>

            <Flex mt="30px">
                <Flex justifyContent="center" alignItems="center" flexDirection="column">
                    {rank.map((r, i) => (
                        <Rank key={i} rank={i + 1} name={r.name} score={r.score} />
                    ))}
                </Flex>
            </Flex>

            <Button
                bg="none"
                border="none"
                mt="20px"
                _hover={{ opacity: 0.8 }}
                _active={{ opacity: 0.6 }}
                onClick={() => navigate('/')}
            >
                <Image src={Restart} alt="restart" w="130px" h="50.38px" />
            </Button>
        </Flex>
    );
}