import React, {useState} from "react";
import {
    Box,
    Divider,
    Flex,
    List,
    ListIcon,
    ListItem,
    Tab,
    Table,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from "@chakra-ui/react";
import Header from "../../components/Header";
import {HomeOutlined, MailOutlined, PhoneOutlined, UserOutlined} from "@ant-design/icons";

const PersonalInfo = () => {
    const [selectedTab, setSelectedTab] = useState(0); // 默认选中第一个菜单项

    // 示例数据，替换成您的实际用户数据
    const user = {
        userStatus: 0,
        address: "上海交通大学软件学院",
        phone: "15111111111",
        userType: 0,
        avatar: "http://myimg.lightece.top/bookstore/assets/avatar/ceylon.jpeg",
        userId: "1",
        email: "user1@example.com",
        username: "user1",
    };

    const userproblems = [
        {
            "difficulty": 2,
            "testCount": 1,
            "problemStatus": 1,
            "problemTitle": "title1",
            "problemId": 1,
            "tags": [
                {
                    "tagId": 1,
                    "content": "tag1"
                },
                {
                    "tagId": 2,
                    "content": "tag2"
                }
            ]
        },
        {
            "difficulty": 2,
            "testCount": 1,
            "problemStatus": 0,
            "problemTitle": "title2",
            "problemId": 2,
            "tags": [
                {
                    "tagId": 3,
                    "content": "tag3"
                },
                {
                    "tagId": 2,
                    "content": "tag2"
                }
            ]
        }
    ]
    const renderProblemStatus = (status) => {
        if (status === 0) return <Text fontWeight="bold" color="green" fontSize="xl">AC</Text>
        if (status === 1) return <Text fontWeight="bold" color="red" fontSize="xl">WA</Text>
        if (status === 2) return <Text fontWeight="bold" color="cyan" fontSize="xl">MLE</Text>
        if (status === 3) return <Text fontWeight="bold" color="yellow" fontSize="xl">TLE</Text>
        if (status === 4) return <Text fontWeight="bold" color="grey" fontSize="xl">RE</Text>
    }
    const renderUserProblems = () => {
        if (userproblems.length === 0) {
            return <Text>No problems found.</Text>;
        }

        return (
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>编号</Th>
                        <Th>题目</Th>
                        <Th>尝试次数</Th>
                        <Th>状态</Th>
                        <Th>题目标签</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {userproblems.map((problem) => (
                        <Tr key={problem.problemId}>
                            <Td>{problem.problemId}</Td>
                            <Td>{problem.problemTitle}</Td>
                            <Td>{problem.testCount}</Td>
                            <Td>{renderProblemStatus(problem.problemStatus)}</Td>
                            <Td>
                                {problem.tags.map((tag) => (
                                    <Tag key={tag.tagId} colorScheme="teal" mr={1}>
                                        {tag.content}
                                    </Tag>
                                ))}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        );
    };


    return (
        <>
            <Header/>
            <Flex p={4} style={{marginTop: "40px"}}>
                <Box w="30%">
                    <VStack align="center" spacing={12}>
                        <Box>
                            <Flex align="center">
                                <img src={user.avatar} alt="Avatar"
                                     style={{width: "100px", height: "100px", borderRadius: "50%", margin: "0 auto"}}/>
                            </Flex>
                            <Text fontSize="3xl" align="center">{user.username}</Text>
                        </Box>
                        <Tabs variant="enclosed" colorScheme="teal" variant="solid-rounded" orientation="vertical"
                              onChange={(index) => setSelectedTab(index)}>
                            <TabList>
                                <Tab>个人信息</Tab>
                                <Tab>我的题目</Tab>
                            </TabList>
                        </Tabs>
                    </VStack>
                </Box>
                <Box w="70%">
                    <Box p={4} borderWidth={1} borderRadius="md">
                        <Tabs index={selectedTab} isLazy>
                            <TabPanels>
                                <TabPanel>
                                    <Text fontWeight="bold">个人信息</Text>
                                    <Divider my={2}/>
                                    <List spacing={3}>
                                        <ListItem>
                                            <ListIcon as={UserOutlined}/>
                                            账号: {user.userId}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={PhoneOutlined}/>
                                            手机号: {user.phone}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={MailOutlined}/>
                                            邮箱: {user.email}
                                        </ListItem>
                                        <ListItem>
                                            <ListIcon as={HomeOutlined}/>
                                            地址: {user.address}
                                        </ListItem>
                                    </List>
                                </TabPanel>
                                <TabPanel>
                                    <Text fontWeight="bold">我尝试的题目</Text>
                                    <Divider my={2}/>
                                    {renderUserProblems()}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Box>
            </Flex>
        </>
    );
};

export default PersonalInfo;
