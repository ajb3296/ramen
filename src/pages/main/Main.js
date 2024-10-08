import React, { useState, useEffect } from "react";
import { Box, Flex, Button, Text, Input, Image, VStack } from "@chakra-ui/react";

import BackgroundImg from "../../images/main_background.webp";
import MainIcon from "../../images/main_icon.webp";
import LoginUser from "../../images/login_user.svg";
import LoginPhone from "../../images/login_phone.svg";
import LoginInput from "../../images/login_input.svg";
import PlayButton from "../../images/play_button.svg";

export default function Main() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("")
  const [, setVh] = useState("1vh");

  useEffect(() => {
    const updateVh = () => {
      setVh(`${window.innerHeight * 0.01}px`);
    };
    updateVh();
    window.addEventListener("resize", updateVh);
    return () => window.removeEventListener("resize", updateVh);
  }, []);

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
                  width="45%"
                  _placeholder={{ color: "gray.600" }}
                  onChange={(e) => setName(e.target.value)}
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
                  width="45%"
                  _placeholder={{ color: "gray.600" }}
                  onChange={(e) => {setPhone(e.target.value)}}
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
              w="min(20vw, 90px)"  // 50% of the original width
              h="min(7.5vw, 35px)"
              _hover={{ opacity: 0.8 }}
              _active={{ opacity: 0.6 }}
            />
          </VStack>
        </VStack>
      </Box>
    </Box>
  );
}