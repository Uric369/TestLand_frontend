import React, { useState } from "react";
import MarkDownEditor from "../../components/Markdown/MarkDownEditor";
import { ChatIcon } from "@chakra-ui/icons";
import { MastercardIcon, VisaIcon} from "../../components/Icons/Icons";
import { Flex,Grid, Button, FormControl, FormLabel, Input, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
const PostEditor = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        if (event.target.value.length <= 100) {
            setDescription(event.target.value);
        }
    };

    const handleSubmit = () => {
        // 处理表单提交逻辑
        console.log("Title:", title);
        console.log("Description:", description);
    };

    return (
        <div>
            <Header/>
            <Grid
                templateColumns={{ md: "1fr", lg: "0.8fr 2.2fr" }}
                templateRows={{ md: "1fr auto", lg: "1fr" }}
                bg="white"
            >
             <Card p='16px' >
            <CardHeader>
                <Flex justify='space-between' align='center' minHeight='60px' w='100%'>
                    <Button bg="teal" color='white' fontSize='2xl' variant='no-hover'>
                        +发起讨论
                    </Button>

                </Flex>
            </CardHeader>
            <CardBody>

            </CardBody>
        </Card>
                

            <Box w="100%">
            <MarkDownEditor />
            </Box>

            </Grid>

            <Flex
                style={{
                    position: "fixed",
                    bottom: "20px",
                    left: "20px",
                    display: "flex",
                }}
            >
                <Flex>
                    <NavLink to="/forum">
                        <Button
                            colorScheme="blue"
                            mr={3}
                            fontSize="lg"
                            fontWeight="bold"
                            boxShadow="lg"
                            w="200px"
                            h="50px"
                        >
                            取消
                        </Button>
                    </NavLink>
                    <Button
                        colorScheme="green"
                        fontSize="lg"
                        fontWeight="bold"
                        boxShadow="lg"
                        w="200px"
                        h="50px"
                        mr="20px"
                        onClick={handleSubmit}
                    >
                        发表
                    </Button>
                </Flex>
            </Flex>
        </div>
    );
};

export default PostEditor;
