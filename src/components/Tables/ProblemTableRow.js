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

    Progress

} from "@chakra-ui/react";

import React from "react";

import {postRequest} from "../../utils/ajax";

import {DelProblem} from "../../services/ProblemService";



function ProblemTableRow(props) {
    const {problemId, problemTitle, tags, level, passRate, updateTime, date} = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    console.log("tags:" + tags)
    console.log("passRate:" + passRate)





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
                    bg={level === 0 ? "green.400" : level === 1 ? "yellow.400" : "red.400"}
                    color="white"
                    fontSize="16px"
                    p="3px 10px"
                    borderRadius="8px"
                >
                    {level === 0 ? "简单" : level === 1 ? "中等" : "困难"}
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

                <Button p="0px" bg="transparent" variant="no-hover">
                    <a href={"/problemDetails/" + problemId}>

                        <Text

                            fontSize="md"

                            color="gray.400"

                            fontWeight="bold"

                            cursor="pointer"

                        >

                            查看

                        </Text>

                    </a>

                </Button>







            </Td>

            <Td>

                <Button p="0px" bg="transparent" variant="no-hover" onClick={handleDelproblem}>

                    <a >

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

export default ProblemTableRow;
  