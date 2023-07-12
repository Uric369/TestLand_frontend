import React from "react";
import {post} from "../variables/Post";
// import { useQuery } from "@chakra-ui/react";
import {ReactMarkdown} from "react-markdown/lib/react-markdown";
import {Avatar, Box, Divider, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {BsBookmark, BsChat, BsEye, BsHeart} from "react-icons/bs";


const ForumInfo = () => {

    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const iconColor = useColorModeValue("gray.700", "gray.200");

    return (
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor} p="20px">
            <Flex direction="column">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Avatar src={post.avatar ? post.avatar : 'https://avatars.dicebear.com/api/male/username.svg'}
                            w="50px" borderRadius="12px" me="18px"/>
                    <Flex direction="column">
                        <Text
                            fontSize="2xl"
                            color={textColor}
                            fontWeight="bold"
                            minWidth="100%"
                        >
                            {post.postTitle}
                        </Text>
                        <Text fontSize="sm" color="gray.400" fontWeight="normal">
                            {post.username}
                        </Text>
                    </Flex>
                </Flex>
                <Divider my="20px" borderWidth="1.3px"/>
                <ReactMarkdown>{post.postText}</ReactMarkdown>
                <Flex mb="30px"></Flex>
                <Flex align="flex-end">
                    <Box display="flex" alignItems="center" color={iconColor}>
                        <Icon as={BsEye} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{post.browse}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsHeart} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{post.likes}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsChat} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{post.reply}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={3}>
                        <Icon as={BsBookmark} w={4} h={4} mr={1}/>
                        <Text fontSize="sm">{post.collect}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" color={iconColor} ml={9}>
                        <Text fontSize="sm">{post.postTime}</Text>
                    </Box>
                </Flex>
            </Flex>
        </Box>
    )
}

export default ForumInfo;