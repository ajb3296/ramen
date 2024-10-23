import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Text, Input, Image, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import BackgroundImg from "../../images/main_background.webp";
import MainIcon from "../../images/main_icon.webp";
import LoginUser from "../../images/login_user.svg";
import LoginPhone from "../../images/login_phone.svg";
import LoginInput from "../../images/login_input.svg";
import PlayButton from "../../images/play_button.svg";

export default function Main() {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [, setVh] = useState("1vh");
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        const updateVh = () => {
            setVh(`${window.innerHeight * 0.01}px`);
        };
        updateVh();
        window.addEventListener("resize", updateVh);
        return () => window.removeEventListener("resize", updateVh);
    }, []);

    // 전화번호 형식 검증 함수
    const validatePhoneNumber = (phoneNumber) => {
        // 빈 문자열이면 true 반환 (선택적 입력이므로)
        if (phoneNumber.trim() === "") return true;
        
        // 숫자만 추출
        const numberOnly = phoneNumber.replace(/[^0-9]/g, "");
        
        // 휴대폰 번호 패턴
        const phonePattern = /^01[016789][0-9]{7,8}$/;
        
        return phonePattern.test(numberOnly);
    };

    // 전화번호 형식화 함수
    const formatPhoneNumber = (phoneNumber) => {
        const numbers = phoneNumber.replace(/[^0-9]/g, "");
        
        if (numbers.length <= 3) return numbers;
        if (numbers.length <= 7) return numbers.slice(0, 3) + "-" + numbers.slice(3);
        return numbers.slice(0, 3) + "-" + numbers.slice(3, 7) + "-" + numbers.slice(7, 11);
    };

    // 전화번호 입력 처리 함수
    const handlePhoneChange = (e) => {
        const formattedNumber = formatPhoneNumber(e.target.value);
        setPhone(formattedNumber);
    };

    const handleSubmit = () => {
        if (name.trim() === "") {
            toast({
                title: "요리사 이름을 입력해주세요.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else if (phone.trim() !== "" && !validatePhoneNumber(phone)) {
            toast({
                title: "올바른 휴대폰 번호 형식이 아닙니다.",
                description: "010, 011, 016, 017, 018, 019로 시작하는 번호만 입력 가능합니다.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top",
            });
        } else {
            const encodedName = encodeURIComponent(name.trim());
            const encodedPhone = encodeURIComponent(phone.trim());
            navigate(`/game?name=${encodedName}&phone=${encodedPhone}`);
        }
    };

    return (
        <Box
            background="black"
            p="4px"
            height="100vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
            overflow="hidden"
        >
            <Box
                backgroundImage={`url(${BackgroundImg})`}
                backgroundSize="cover"
                backgroundRepeat="no-repeat"
                backgroundPosition="center"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <VStack
                    spacing={0}
                    align="stretch"
                    width="90%"
                    maxWidth="400px"
                    height="90%"
                    justifyContent="space-between"
                    color="white"
                >
                    <VStack spacing={0} align="center">
                        <Image
                            src={MainIcon}
                            alt="Main Icon"
                            w="20vmin"
                            maxW="100px"
                            objectFit="contain"
                        />
                        <Text fontSize="min(4vw, 20px)" fontWeight="bold">
                            라면 계급 전쟁
                        </Text>
                        <Text fontSize="min(10vw, 50px)" fontWeight="bold" lineHeight="1">
                            라면요리사
                        </Text>
                    </VStack>

                    <VStack spacing={2} align="stretch" width="100%">
                        <Flex align="center" justify="center">
                            <Flex align="center" width="40%">
                                <Image src={LoginUser} w="min(6vw, 30px)" mr={2} />
                                <Text fontSize="min(4vw, 20px)" whiteSpace="nowrap">
                                    요리사 :
                                </Text>
                            </Flex>
                            <Flex
                                w="30%"
                                backgroundImage={`url(${LoginInput})`}
                                backgroundSize="100% 100%"
                                backgroundRepeat="no-repeat"
                                backgroundPosition="center"
                                height="min(8vw, 40px)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Input
                                    border="none"
                                    background="none"
                                    color="black"
                                    fontSize="min(3vw, 14px)"
                                    height="80%"
                                    width="90%"
                                    _placeholder={{ color: "gray.600" }}
                                    onChange={(e) => setName(e.target.value)}
                                    isRequired
                                />
                            </Flex>
                        </Flex>
                        <Flex align="center" justify="center">
                            <Flex align="center" width="40%">
                                <Image src={LoginPhone} w="min(6vw, 30px)" mr={2} />
                                <Text fontSize="min(4vw, 20px)" whiteSpace="nowrap">
                                    전화번호 :
                                </Text>
                            </Flex>
                            <Flex
                                w="30%"
                                backgroundImage={`url(${LoginInput})`}
                                backgroundSize="100% 100%"
                                backgroundRepeat="no-repeat"
                                backgroundPosition="center"
                                height="min(8vw, 40px)"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Input
                                    border="none"
                                    background="none"
                                    color="black"
                                    fontSize="min(3vw, 14px)"
                                    height="80%"
                                    width="90%"
                                    _placeholder={{ color: "gray.600" }}
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    maxLength={13}
                                />
                            </Flex>
                        </Flex>
                    </VStack>

                    <VStack spacing="4px" align="center">
                        <Text fontSize="min(2.5vw, 12px)" textAlign="center">
                            * 전화번호의 경우 필수입력칸은 아니지만 경품을 받기 위해선 전화번호 입력이 필요합니다
                        </Text>
                        <Button
                            as="button"
                            backgroundImage={`url(${PlayButton})`}
                            backgroundSize="contain"
                            backgroundRepeat="no-repeat"
                            backgroundPosition="center"
                            border="none"
                            background="none"
                            w="min(20vw, 90px)"
                            h="min(7.5vw, 35px)"
                            _hover={{ opacity: 0.8 }}
                            _active={{ opacity: 0.6 }}
                            onClick={handleSubmit}
                        />
                    </VStack>
                </VStack>
            </Box>
        </Box>
    );
}