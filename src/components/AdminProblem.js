import React, { useState, useEffect } from "react";
import {
    Button,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    Stack,
    Tag,
    TagLabel,
    TagCloseButton,
} from "@chakra-ui/react";
import ProblemList from "./ProblemList";
import ProblemAddingForm from "./Tables/ProblemAddingForm";
import { getCategoryContentById } from "../services/ProblemService";
import ProblemListAdmin from "./ProblemListAdmin";

const AdminProblem = () => {
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editProblemId, setEditProblemId] = useState(null);
    const [editFormData, setEditFormData] = useState({
        problemId: "",
        problemTitle: "",
        difficulty: "",
        description: "",
        hint: "",
        category: "",
        tags: [],
        newTag: "", // 新标签输入框的值
    });

    const handleAddProblem = () => {
        setShowForm(true);
    };

    const handleEditProblem = () => {
        const problemId = prompt("请输入要修改的题目ID：");
        if (problemId) {
            setEditProblemId(problemId);
            fetchProblemData(problemId);
        }
    };

    const fetchProblemData = async (problemId) => {
        try {
            const response = await fetch(`http://localhost:8080/getProblemById?problemId=${problemId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.status === 1) {
                    setEditFormData(data.data);
                    // 获取类别内容
                    getCategoryContentById(data.data.categoryId, (result) => {
                        if (result.status === 1) {
                            setEditFormData((prevState) => ({
                                ...prevState,
                                category: result.data,
                            }));
                            setShowEditForm(true);
                        } else {
                            console.error(result.message);
                        }
                    });
                } else {
                    console.error(data.message);
                }
            } else {
                alert("Failed to fetch problem "+problemId+",this problem does not exist");
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleTagsChange = (selectedTags) => {
        setEditFormData({
            ...editFormData,
            tags: selectedTags,
        });
    };

    const handleAddTag = () => {
        const newTag = editFormData.newTag.trim();
        if (newTag) {
            setEditFormData((prevState) => ({
                ...prevState,
                tags: [...prevState.tags, { content: newTag }],
                newTag: "", // 清空新标签输入框
            }));
        }
    };

    const handleEditFormSubmit = async () => {
        try {
            // 格式化数据以提交
            const updatedProblem = {
                problemId: editProblemId.toString(),
                problemTitle: editFormData.problemTitle ? editFormData.problemTitle.toString() : "",
                difficulty: editFormData.difficulty ? editFormData.difficulty.toString() : "",
                description: editFormData.description ? editFormData.description.toString() : "",
                hint: editFormData.hint ? editFormData.hint.toString() : "",
                category: editFormData.category ? editFormData.category.toString() : "",
                tags: editFormData.tags ? editFormData.tags.map((tag) => tag.content.toString()) : [],
            };

            const response = await fetch("http://localhost:8080/updateProblem", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedProblem),
            });

            if (response.ok) {
                // 处理成功的更新
                setShowEditForm(false);
                setEditProblemId(null);
                setEditFormData({
                    problemId: "",
                    problemTitle: "",
                    difficulty: "",
                    description: "",
                    hint: "",
                    category: "",
                    tags: [],
                    newTag: "", // 清空新标签输入框
                });
            } else {
                console.error("Failed to update problem");
            }
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    };

    return (
        <Flex style={{ marginLeft: '100px' }} direction='column' pt={{ base: "100px", md: "50px" }}>
            <div>
                {!showForm && (
                    <div>
                        <ProblemListAdmin />
                        <Button onClick={handleAddProblem}>新增题目</Button>
                    </div>
                )}
                {showForm && <ProblemAddingForm setShowForm={setShowForm} />}
            </div>

            {showEditForm && (
                <Modal isOpen={true} onClose={() => setShowEditForm(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>编辑题目</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>题目标题</FormLabel>
                                <Input
                                    type="text"
                                    name="problemTitle"
                                    value={editFormData.problemTitle}
                                    onChange={handleInputChange}
                                    placeholder="题目标题"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>难度</FormLabel>
                                <Input
                                    type="number"
                                    name="difficulty"
                                    value={editFormData.difficulty}
                                    onChange={handleInputChange}
                                    placeholder="难度"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>题目描述</FormLabel>
                                <Textarea
                                    name="description"
                                    value={editFormData.description}
                                    onChange={handleInputChange}
                                    placeholder="题目描述"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>提示</FormLabel>
                                <Textarea
                                    name="hint"
                                    value={editFormData.hint}
                                    onChange={handleInputChange}
                                    placeholder="提示"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>类别</FormLabel>
                                <Input
                                    type="text"
                                    name="category"
                                    value={editFormData.category}
                                    onChange={handleInputChange}
                                    placeholder="类别"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>标签</FormLabel>
                                <Stack spacing={2}>
                                    {editFormData.tags.map((tag, index) => (
                                        <Tag key={index} size="md" variant="solid" colorScheme="teal">
                                            <TagLabel>{tag.content}</TagLabel>
                                            <TagCloseButton
                                                onClick={() => {
                                                    const updatedTags = [...editFormData.tags];
                                                    updatedTags.splice(index, 1);
                                                    handleTagsChange(updatedTags);
                                                }}
                                            />
                                        </Tag>
                                    ))}
                                </Stack>
                                <Input
                                    type="text"
                                    name="newTag"
                                    value={editFormData.newTag}
                                    onChange={handleInputChange}
                                    placeholder="输入新标签"
                                />
                                <Button
                                    size="sm"
                                    colorScheme="teal"
                                    onClick={() => {
                                        handleAddTag();
                                    }}
                                >
                                    添加标签
                                </Button>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={handleEditFormSubmit}>
                                提交
                            </Button>
                            <Button onClick={() => setShowEditForm(false)}>取消</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}

            {/* 在需要显示更新按钮的地方 */}
            <div>
                <Button colorScheme="blue" onClick={handleEditProblem}>
                    更新题目信息
                </Button>
            </div>
        </Flex>
    );
};

export default AdminProblem;
