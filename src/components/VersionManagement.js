import React, { useState } from "react";
import { getCodeHistory, getTestHistoryList } from "../services/TestService";
import { useEffect } from "react";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    Grid,
    Tag,
    Text,
    Flex,
    useColorModeValue,
    Table,
    Tr,
    Th,
    Tbody,
    Thead,
    Button,
    Textarea,
} from "@chakra-ui/react";
import VersionTableRow from "./Tables/VersionTableRow";
import { data } from "../view/User/SubmitCode";

const results = ["AC", "WA", "TLE", "MLE", "RE"];

const VersionManagement = (props) => {
    const { problemId } = props;
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const [testHistoryList, setTestHistoryList] = useState();
    const [codeHistory, setCodeHistory] = useState();
    const [showCode, setShowCode] = useState(false);
    const textColor = useColorModeValue("gray.700", "white");
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const captions = ["用例", "结果", "分数", "耗时", "内存", "报错"];
    console.log("userId" + userId);
    console.log("problemId" + problemId);
    useEffect(() => {
        getTestHistoryList(userId, problemId, (data) => {
            console.log(data);
            if (data.status > 0 && data.data) {
                setTestHistoryList(data.data);
            } else setTestHistoryList(null);
        });
    }, []);

    console.log("testHistoryList" + testHistoryList);

    function handleGetCodeHistory(userTestId) {
        getCodeHistory(userTestId, (data) => {
            console.log(data);
            if (data.status > 0 && data.data) {
                setCodeHistory(data.data);
                setShowCode(userTestId);
            } else setCodeHistory(null);
        });
        console.log(codeHistory);
    }

    useEffect(() => {
        console.log("codeHistory", codeHistory);
    }, [codeHistory]);

    return (
        <Accordion defaultIndex={[0]} allowMultiple>
            {testHistoryList &&
                testHistoryList.map((item) => (
                    <AccordionItem key={item.userTestId}>
                        <h2>
                            <AccordionButton
                                bg={item.result === "0" ? "green.400" : "tomato"}
                            >
                                <Box as="span" flex="1" textAlign="left">
                                    <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="xl" color="white" fontWeight="bold">
                                                {item.result ? results[item.result] : "-"}
                                            </Text>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                分数
                                            </Text>
                                            <Tag size="md">{item.score ?? "-"}</Tag>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                语言
                                            </Text>
                                            <Tag size="md">{item.language ?? "-"}</Tag>
                                        </Flex>
                                        <Flex direction="row" mt="10px">
                                            <Text fontSize="md" color={textColor} mr="10px">
                                                测试时间
                                            </Text>
                                            <Tag size="md">{item.timeStamp ?? "-"}</Tag>
                                        </Flex>
                                        <Button
                                            onClick={() => handleGetCodeHistory(item.userTestId)}
                                            p="20px"
                                            borderRadius="xl"
                                            bg="transparent"
                                            variant="solid"
                                            h="100px"
                                            zIndex="1"
                                        >
                                            查看代码
                                        </Button>
                                    </Grid>
                                </Box>
                                <AccordionIcon />
                            </AccordionButton>
                        </h2>

                        <AccordionPanel pb={4}>
                            <Table variant="simple" color={textColor}>
                                <Thead>
                                    <Tr my=".8rem" color="gray.400">
                                        {captions.map((caption, idx) => {
                                            return <Th color="gray.400" key={idx}>{caption}</Th>;
                                        })}
                                    </Tr>
                                </Thead>

                                <Tbody>
                                    {item.userTestcases.map((testcase, index) => (
                                        <VersionTableRow
                                            key={testcase.testcaseId}
                                            testcase={testcase}
                                            index={index}
                                        />
                                    ))}
                                </Tbody>
                            </Table>

                            {showCode === item.userTestId && (
                                <Textarea
                                    value={codeHistory}
                                    onChange={(e) => setCodeHistory(e.target.value)}
                                    rows={8}
                                    placeholder="代码详情"
                                />
                            )}
                        </AccordionPanel>
                    </AccordionItem>
                ))}
        </Accordion>
    );
};

export default VersionManagement;
