import {post} from "../variables/Post";
import React from "react";
import {Avatar, Box, Divider, Flex, Icon, Text, useColorModeValue} from "@chakra-ui/react";
import {BsHeart} from "react-icons/bs";

const Comments = () => {
    const textColor = useColorModeValue("gray.700", "white");
    const bgModeColor = useColorModeValue("gray.100", "black");
    const commentBgColor = useColorModeValue("white", "gray.800");
    const iconColor = useColorModeValue("gray.700", "gray.200");

    return (
        <Box borderRadius="2xl" overflow="hidden" bg={bgModeColor} p="20px">
            <Flex>
                <Text
                    fontSize="2xl"
                    color={textColor}
                    fontWeight="bold"
                    minWidth="100%"
                >
                    {post.comments.length} 条评论
                </Text>
            </Flex>
            <Divider my="20px" borderWidth="1.3px"/>
            {/* 评论区展示开始 */}
            {post.comments.map((comment, index) => (
                <Box
                    key={index}
                    bg={commentBgColor}
                    p="15px"
                    mb="15px"
                    borderRadius="md"
                    boxShadow="sm"
                    color={textColor}
                >
                    <Flex justify="space-between" align="center">
                        <Flex align="center">
                            <Avatar size="sm" name={comment.username} src={comment.avatar} mr="10px"/>
                            <Text fontSize="md" fontWeight="bold" isTruncated>
                                {comment.username}
                            </Text>
                        </Flex>
                        <Box display="flex" alignItems="center" color={iconColor}>
                            <Icon as={BsHeart} w={5} h={5}/>
                            <Text fontSize="sm" ml="3px" fontWeight="bold">
                                {comment.likes}
                            </Text>
                        </Box>
                    </Flex>
                    <Text fontSize="lg" mt="10px" isTruncated>
                        {comment.content}
                    </Text>
                    <Flex justify="flex-end" mt="10px">
                        <Text fontSize="sm">{comment.commentTime}</Text>
                    </Flex>
                </Box>
            ))}
            {/* 评论区展示结束 */}
        </Box>
    );
};

export default Comments;
