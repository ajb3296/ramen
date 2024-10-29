import React, { useState, useEffect } from "react";
import { Box, Flex, Text, Image } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { addListener, launch } from 'devtools-detector';
import axios from 'axios';
import { useQuery } from 'react-query';

import BottomBoardList from "../../components/game/BottomBoardList";
import { BASE_URL } from "../../utils/url";

import BackgroundImg from "../../images/game_background.webp";
import ScoreBoard from "../../components/game/ScoreBoard";
import Dish from "../../components/game/Dish";
import Fire from "../../images/fire.webp";

const fetchData = async ({ queryKey }) => {
    const [path, name, phone, score] = queryKey;
    const response = await axios.post(`${BASE_URL}/${path}`, {
        name,
        phone,
        score: parseInt(score)
    });
    return response.data;
};

export default function Game() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get("name");
    const phone = queryParams.get("phone");

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(30);
    const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);
    const [countdown, setCountdown] = useState(3);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameFinished, setGameFinished] = useState(false);
    const [showScore, setShowScore] = useState(false);

    const view = document.createElement('div');
    document.body.appendChild(view);

    // 각 요리에 들어간 재료 수
    const [dishStatus, setDishStatus] = useState([0, 0, 0]);
    // 현재 그릇 인덱스
    const [dishIndex, setDishIndex] = useState(0);
    // 각 그릇의 임시 점수
    const [dishScore, setDishScore] = useState([0, 0, 0]);

    // 선택된 재료들을 저장하는 state
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    // 매번 섞임
    const [ingredients, setIngredients] = useState({
        1: "egg",
        2: "flake",
        3: "green_onion",
        4: "water",
        5: "noodle",
        6: "soup"
    });

    // 개발자 도구 감지
    addListener((isOpen) => {
        if (isOpen) {
            // alert("불법 소프트웨어가 감지되었습니다. 게임을 진행할 수 없습니다.");
            navigate('/');
        }
    });

    // 2. Launch detection
    launch();

    // 데이터 검증
    useEffect(() => {
        // 파라미터 존재 여부 확인
        if (!name) {
            navigate('/');
            return;
        }
    
        // 이름 검증 (빈 문자열이 아닌지만 확인)
        if (name.trim() === '') {
            alert("올바른 이름을 입력해주세요.");
            navigate('/');
            return;
        }
    
        // 전화번호 검증
        if (phone) {
            const cleanPhone = phone.replace(/[^0-9]/g, '');
            if (!cleanPhone.match(/^01[016789][0-9]{7,8}$/)) {
                navigate('/');
                return;
            }
        }
    }, []);

    const { data, isLoading, error, refetch } = useQuery(
        [`add_score`, name, phone, score],
        fetchData,
        {
            enabled: gameFinished, // gameFinished가 true일 때만 쿼리 실행
            cacheTime: 0,
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            retry: false,
            onSuccess: (data) => {
                console.log('점수 등록 성공:', data);
            },
            onError: (error) => {
                console.error('점수 등록 실패:', error);
            }
        }
    );

    // 게임 종료 후 점수 표시 및 메인 페이지로 리다이렉트
    useEffect(() => {
        if (gameFinished) {
            // 2초 후 점수 표시
            const showScoreTimer = setTimeout(() => {
                setShowScore(true);
            }, 2000);

            // 4초 후 메인 페이지로 리다이렉트 (2초 대기 + 2초 점수 표시)
            const redirectTimer = setTimeout(() => {
                navigate('/ranking');
            }, 5000);

            return () => {
                clearTimeout(showScoreTimer);
                clearTimeout(redirectTimer);
            };
        }
    }, [gameFinished, navigate, score]);

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

    // 화면 방향 감지 함수
    const checkOrientation = () => {
        setIsLandscape(window.innerWidth > window.innerHeight);
    };

    // 컴포넌트가 처음 렌더링될 때 shuffleIngredients 함수를 한 번 실행
    useEffect(() => {
        shuffleIngredients();
        checkOrientation();
        window.addEventListener('resize', checkOrientation);
        return () => window.removeEventListener('resize', checkOrientation);
    }, []);

    // 카운트다운 효과
    useEffect(() => {
        if (isLandscape && countdown > 0) {
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(timer);
                        setCountdown(0);
                        setTimeout(() => setGameStarted(true), 1000);
                        return 0;
                    }
                });
            }, 1000);
        
            return () => clearInterval(timer);
        }
    }, [isLandscape, countdown]);

    // time을 매초마다 1씩 줄이는 useEffect, isLandscape가 false일 때는 타이머를 멈춤
    useEffect(() => {
        let timer;
        if (isLandscape && gameStarted && time > 0) {
            timer = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime > 1) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timer);
                        setGameFinished(true);
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [isLandscape, gameStarted, time]);

    if (!isLandscape) {
        return (
            <Flex
                height="100vh"
                justifyContent="center"
                alignItems="center"
                backgroundColor="rgba(0,0,0,0.8)"
                color="white"
                flexDirection="column"
            >
                <Text fontSize="24px" fontWeight="bold" mb="20px">
                    화면을 가로로 돌려주세요
                </Text>
                <Box transform="rotate(90deg)">
                    <span role="img" aria-label="rotate phone" style={{ fontSize: '48px' }}>
                        📱
                    </span>
                </Box>
            </Flex>
        );
    }

    return (
        <Flex
            backgroundImage={`url(${BackgroundImg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            height="100vh"
            justifyContent="center"
            position="relative"
        >
            {!gameStarted && (
                <Flex
                    position="absolute"
                    top="0"
                    left="0"
                    right="0"
                    bottom="0"
                    backgroundColor="rgba(0,0,0,0.7)"
                    justifyContent="center"
                    alignItems="center"
                    zIndex="10"
                >
                    <Text fontSize="96px" fontWeight="bold" color="white">
                        {countdown === 0 ? "GO!" : countdown}
                    </Text>
                </Flex>
            )}
            {gameFinished && (
                <Box>
                    {!showScore ? (
                        <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            backgroundColor="rgba(0,0,0,0.7)"
                            justifyContent="center"
                            alignItems="center"
                            flexDirection="column"
                            zIndex="10"
                        >
                            <Text fontSize="96px" fontWeight="bold" color="white">
                                Finish!
                            </Text>
                        </Flex>
                    ) : (
                        <Flex
                            position="absolute"
                            top="0"
                            left="0"
                            right="0"
                            bottom="0"
                            backgroundColor="black"
                            justifyContent="center"
                            alignItems="center"
                            zIndex="10"
                        >
                            <Image src={Fire} alt="fire" w="70px" />
                            <Text
                                fontSize="50px"
                                fontWeight="bold"
                                bgGradient="linear(to-b, #CA1F00, #FF7528)"
                                bgClip="text"
                            >
                                {score}점
                            </Text>
                            <Image src={Fire} alt="fire" w="70px" />
                        </Flex>
                    )}
                </Box>
            )}
            <Box height="100%">
                <Flex justifyContent="center" gap="16px" mt="15px">
                    <ScoreBoard text={name} />
                    <ScoreBoard text={`${time}초`} />
                    <ScoreBoard text={`${score}점`} />
                </Flex>

                <Flex justifyContent="space-around">
                    {dishStatus.map((status, index) => (
                        <Dish
                            key={index}
                            id={index}
                            dish={status}
                            score={score}
                            setScore={setScore}
                            addScore={dishScore[index]}
                            dishScore={dishScore}
                            setDishScore={setDishScore}
                            dishStatus={dishStatus}
                            setDishStatus={setDishStatus}
                        />
                    ))}
                </Flex>
                <Box position="absolute" bottom="0px">
                    <BottomBoardList
                        ingredients={ingredients}
                        selectedIngredients={selectedIngredients}
                        setSelectedIngredients={setSelectedIngredients}
                        dishStatus={dishStatus}
                        setDishStatus={setDishStatus}
                        dishIndex={dishIndex}
                        setDishIndex={setDishIndex}
                        shuffleIngredients={shuffleIngredients}
                        dishScore={dishScore}
                        setDishScore={setDishScore}
                    />
                </Box>
            </Box>
        </Flex>
    );
}