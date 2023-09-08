import {

    Avatar,

    Badge,

    Button,

    Flex,

    Td,

    Text,

    Tr,

    useColorModeValue,

    Tag,

    Progress, Box, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Heading

} from "@chakra-ui/react";

import React, {useState, useEffect} from "react";

import {postRequest} from "../../utils/ajax";

import {DelProblem, getProblemById} from "../../services/ProblemService";
import TestResultsChart from "../TestResultsChart";



function ProblemTableRowAdmin(props) {
    const {
        problemId,
        problemTitle,
        difficulty,
        description,
        hint,
        category,
        tags,
        level,
        passRate,
        updateTime,
        date,
        handleUpdate
    } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    const [isOpen, setIsOpen] = useState(false);
    const [problemDetails, setProblemDetails] = useState(null);

    useEffect(() => {
        if (isOpen) {
          getProblemById(problemId, (data) => {
            setProblemDetails(data.data); 
          });
        }
      }, [isOpen, problemId]);
    
      const onClose = () => {
        setIsOpen(false);
      };

    const handleClick = () => {
        console.log("clicked: ---------" + problemId + problemTitle + difficulty + description + hint + category + tags + level + passRate + updateTime + date);
        handleUpdate({problemId, problemTitle, difficulty, description, hint, tags});
    };

    function handleDelproblem() {

        DelProblem(problemId);

    }


    return (
        <Tr>

            <Td>
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {problemId}
                    </Text>
                </Flex>
            </Td>

            <Td minWidth={{sm: "100x"}} pl="0px">
                <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                    <Text fontSize="md" color={textColor} fontWeight="bold">
                        {problemTitle}
                    </Text>
                </Flex>
            </Td>
            <Td>
                {tags.map((tag) => (
                    <Tag key={tag} size="sm" mr={1}>
                        {tag}
                    </Tag>
                ))}
            </Td>


            <Td>
                <Badge
                    bg={level === "0" ? "green.400" : level === "1" ? "yellow.400" : "red.400"}
                    color="white"
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {level === "0" ? "简单" : level === "1" ? "中等" : "困难"}
                </Badge>
            </Td>

            <Td>
                <Flex direction="column">
                    <Text
                        fontSize="md"
                        color="teal.300"
                        fontWeight="bold"
                        pb=".2rem"
                    >{`${passRate}%`}</Text>
                    <Progress
                        colorScheme={passRate >= 50 ? "teal" : "cyan"}
                        size="xs"
                        value={passRate}
                        borderRadius="15px"
                    />
                </Flex>
            </Td>

            <Td>
                <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                    {updateTime}
                </Text>
            </Td>
            <Td>
                <Button
                        p="0px"
                        bg="transparent"
                        variant="no-hover"
                        onClick={() => setIsOpen(true)}
                    >
                        <Text
                        fontSize="md"
                        color="gray.400"
                        fontWeight="bold"
                        cursor="pointer"
                        >
                        查看
                        </Text>
                </Button>
                <Drawer isOpen={isOpen} onClose={onClose} size="lg">
                    <DrawerOverlay />
                    <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                            <Heading as="h2" size="lg" mb="1rem">
                                问题详情
                            </Heading>
                    </DrawerHeader>
                    <DrawerBody>
                        {problemDetails ? (
                        <div>                           
                            <Box mb="1rem">
                                <Text fontWeight="bold">问题标题:</Text>
                                <Text>{problemDetails.problemTitle}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">难度:</Text>
                                <Text>{problemDetails.difficulty}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">描述:</Text>
                                <Text>{problemDetails.description}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">提示:</Text>
                                <Text>{problemDetails.hint}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">更新时间:</Text>
                                <Text>{problemDetails.updateTime}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">分类:</Text>
                                <Text>{problemDetails.category}</Text>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">标签:</Text>
                                <Flex>
                                {problemDetails.tags.map((tag) => (
                                    <Badge key={tag.tagId} colorScheme="green" m="2px">
                                    {tag.content}
                                    </Badge>
                                ))}
                                </Flex>
                            </Box>
                            <Box mb="1rem">
                                <Text fontWeight="bold">作答情况:</Text>
                                <TestResultsChart
                                    acCount={problemDetails.acCount}
                                    waCount={problemDetails.waCount}
                                    tleCount={problemDetails.tleCount}
                                    reCount={problemDetails.reCount}
                                    mleCount={problemDetails.mleCount}
                                />
                            </Box>
                        </div>
                            ) : (
                            <p>加载中...</p>
                            )}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

            </Td>
            <Td>
                <Button p="0px" bg="transparent" variant="no-hover" onClick={handleDelproblem}>
                    <a>
                        <Text
                            fontSize="md"
                            color="gray.400"
                            fontWeight="bold"
                            cursor="pointer"
                        >
                            删除
                        </Text>
                    </a>
                </Button>

            </Td>


        </Tr>
    );
}

export default ProblemTableRowAdmin;
