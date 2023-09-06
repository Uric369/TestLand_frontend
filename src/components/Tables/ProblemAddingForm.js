import React, { useState } from "react";
import { Button, Card, Form, Input, Radio, Upload } from "antd";
import axios from "axios";

const ProblemAddingForm = ({ setShowForm }) => {
    const [problemTitle, setProblemTitle] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [hint, setHint] = useState("");
    const [testCases, setTestCases] = useState([]);
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState([]);
    const [examples, setExamples] = useState([]);
    const [uploadType, setUploadType] = useState(null);
    const [testCasesFile, setTestCasesFile] = useState(null);

    const handleAddSubmit = () => {
        const data = {
            problemTitle,
            difficulty,
            description,
            hint,
            testCases: uploadType === "manual" ? testCases : null,
            category,
            tags,
            examples,
            testCasesFile: null, // 初始化 testCasesFile 为 null
        };

        if (uploadType === "manual") {
            // 执行手动输入测试用例的提交逻辑
            console.log("提交数据：", data);
            // 发送数据给后端的代码
            // 例如使用axios发送POST请求
            axios
                .post("http://localhost:8080/addProblem", data)
                .then((response) => {
                    // 处理成功提交后的逻辑
                })
                .catch((error) => {
                    // 处理提交失败后的逻辑
                });
        } else if (uploadType === "file") {
            // 执行上传压缩包的提交逻辑

            const data = {
                problemTitle,
                difficulty,
                description,
                hint,
                category,
                tags,
                examples,
                // testCasesFile
            };
            console.log(testCasesFile)

            const formData = new FormData();

            formData.append("problem", JSON.stringify(data));
            formData.append("testCasesFile", testCasesFile);
            console.log("上传数据：", formData);
            axios
                .post("http://localhost:8080/addProblemByFile", formData)
                .then((response) => {
                    // 处理成功提交后的逻辑
                })
                .catch((error) => {
                    // 处理提交失败后的逻辑
                });
        }

        setProblemTitle("");
        setDifficulty("");
        setDescription("");
        setHint("");
        setTestCases([]);
        setCategory("");
        setTags([]);
        setExamples([]);

        setShowForm(false);
    };

    const handleFinishFailed = (errorInfo) => {
        console.log("表单提交失败:", errorInfo);
    };

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: "", output: "" }]);
    };

    const handleTestCaseInputChange = (index, event) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index].input = event.target.value;
        setTestCases(updatedTestCases);
    };

    const handleTestCaseOutputChange = (index, event) => {
        const updatedTestCases = [...testCases];
        updatedTestCases[index].output = event.target.value;
        setTestCases(updatedTestCases);
    };

    const handleAddExample = () => {
        setExamples([...examples, { input: "", output: "", explanation: "" }]);
    };

    const handleExampleInputChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].input = event.target.value;
        setExamples(updatedExamples);
    };

    const handleExampleOutputChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].output = event.target.value;
        setExamples(updatedExamples);
    };

    const handleExampleExplanationChange = (index, event) => {
        const updatedExamples = [...examples];
        updatedExamples[index].explanation = event.target.value;
        setExamples(updatedExamples);
    };

    const handleTestCasesFileChange = (file) => {
        setTestCasesFile(file);
        console.log("file"+file)
        return false; // 阻止上传
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ width: 600 }}>
                <h2>新增题目</h2>
                <Form onFinish={handleAddSubmit} onFinishFailed={handleFinishFailed} layout="vertical">
                    <Form.Item
                        label="标题"
                        name="problemTitle"
                        rules={[
                            {
                                required: true,
                                message: "请输入题目标题",
                            },
                        ]}
                    >
                        <Input value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="难度"
                        name="difficulty"
                        rules={[
                            {
                                required: true,
                                message: "请选择题目难度",
                            },
                        ]}
                    >
                        <Input value={difficulty} onChange={(e) => setDifficulty(e.target.value)} />
                    </Form.Item>

                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "请输入问题描述",
                            },
                        ]}
                    >
                        <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="提示" name="hint">
                        <Input.TextArea value={hint} onChange={(e) => setHint(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="上传方式">
                        <Radio.Group onChange={(e) => setUploadType(e.target.value)}>
                            <Radio value="manual">手动输入</Radio>
                            <Radio value="file">上传压缩包</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {uploadType === "manual" && (
                        <Form.Item label="测试用例" name="testCases">
                            {testCases.map((testCase, index) => (
                                <div key={index} style={{ marginBottom: 16 }}>
                                    <Input
                                        placeholder="输入"
                                        value={testCase.input}
                                        onChange={(e) => handleTestCaseInputChange(index, e)}
                                        style={{ marginBottom: 8 }}
                                    />
                                    <Input
                                        placeholder="输出"
                                        value={testCase.output}
                                        onChange={(e) => handleTestCaseOutputChange(index, e)}
                                        style={{ marginBottom: 8 }}
                                    />
                                </div>
                            ))}
                            <Button type="dashed" onClick={handleAddTestCase} style={{ width: "100%" }}>
                                添加测试用例
                            </Button>
                        </Form.Item>
                    )}

                    {uploadType === "file" && (
                        <Form.Item label="上传测试用例" name="testCasesFile">
                            <Upload beforeUpload={handleTestCasesFileChange} accept=".zip">
                                <Button>选择压缩包文件</Button>
                            </Upload>
                        </Form.Item>
                    )}

                    <Form.Item
                        label="类别"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: "请输入题目类别",
                            },
                        ]}
                    >
                        <Input value={category} onChange={(e) => setCategory(e.target.value)} />
                    </Form.Item>

                    <Form.Item label="标签" name="tags">
                        <Input.TextArea
                            value={tags.join(",")}
                            onChange={(e) => setTags(e.target.value.split(","))}
                            placeholder="输入标签，多个标签使用逗号分隔"
                        />
                    </Form.Item>

                    <Form.Item label="示例" name="examples">
                        {examples.map((example, index) => (
                            <div key={index} style={{ marginBottom: 16 }}>
                                <Input
                                    placeholder="输入"
                                    value={example.input}
                                    onChange={(e) => handleExampleInputChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                                <Input
                                    placeholder="输出"
                                    value={example.output}
                                    onChange={(e) => handleExampleOutputChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                                <Input.TextArea
                                    placeholder="解释"
                                    value={example.explanation}
                                    onChange={(e) => handleExampleExplanationChange(index, e)}
                                    style={{ marginBottom: 8 }}
                                />
                            </div>
                        ))}
                        <Button type="dashed" onClick={handleAddExample} style={{ width: "100%" }}>
                            添加示例
                        </Button>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default ProblemAddingForm;