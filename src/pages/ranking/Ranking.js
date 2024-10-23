import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Image, Button } from "@chakra-ui/react";
import axios from 'axios';
import { useQuery } from 'react-query';

import Rank from "../../components/ranking/Rank";
import { BASE_URL } from "../../utils/url";

import Fire from "../../images/fire.webp";
import Restart from "../../images/restart_button.webp";

const fetchRanking = async ({ queryKey }) => {
    const [path] = queryKey;
    const response = await axios.get(`${BASE_URL}${path}`);
    return response.data;
};

export default function Ranking() {
    const navigate = useNavigate();

    const [rank, setRank] = useState([])

    const { data: rankingData, isLoading: loading, error: error, refetch: refetchData } = useQuery(
        [`ranking`],
        fetchRanking,
        { enabled: true }
    );

    useEffect(() => {
        if (rankingData) {
            console.log(rankingData.ranking);
            setRank(rankingData.ranking);
        }
    }, [rankingData]);

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