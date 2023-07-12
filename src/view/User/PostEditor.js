import React, {useState} from "react";
import MarkDownEditor from "../../components/MarkDownEditor";
import {ChatIcon} from "@chakra-ui/icons";
import {MastercardIcon} from "../../components/Icons/Icons";
import {Button, Flex, Grid} from "@chakra-ui/react";
import {NavLink} from "react-router-dom";
import TitleSummaryInput from "../../components/TitleSummaryInput";

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
            <Grid
                templateColumns={{md: "1fr", lg: "2.0fr 1.0fr"}}
                templateRows={{md: "1fr auto", lg: "1fr"}}
                bg="white"
            >
                {/* <FormControl id="title" mt={6} color="gray.500">
  <FormLabel color="black">标题</FormLabel>
  <Input color="black" type="text" value={title} onChange={handleTitleChange} />
</FormControl>

<FormControl id="description" mt={4} color="gray.500">
  <FormLabel color="black">简介</FormLabel>
  <Input
    type="text"
    value={description}
    onChange={handleDescriptionChange}
  />
</FormControl> */}
                <TitleSummaryInput
                    title={"Payment Method"}
                    mastercard={{
                        icon: <MastercardIcon w='100%' h='100%'/>,
                        number: "标题",
                    }}
                    visa={{
                        icon: <ChatIcon w='100%' h='100%'/>,
                        number: "简介不超过100个字",
                    }}
                />
            </Grid>

            <MarkDownEditor/>


            <Flex
                style={{
                    position: "fixed",
                    bottom: "20px",
                    right: "20px",
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
