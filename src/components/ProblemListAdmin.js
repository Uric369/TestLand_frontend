
import {Button, Flex} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Problems from "./Problems";
import Pagination from "./Tables/Pagination";
import { getAllProblemByPage } from "../services/ProblemService";
import ProblemsAdmin from "./ProblemsAdmin";
import ProblemUpdateForm from "./ProblemUpdateForm";
import axios from "axios";

function ProblemListAdmin(props) {
    const [page, setPage] = useState(1);
    const [problemdata, setProblemData] = useState([]);
    const pageSize = 5; // 每页数量
    const {onUpdate} = props;
    useEffect(() => {
        getAllProblemByPage(page, pageSize, (data) => {
            console.log("sss" + data);
            setProblemData(data.data);
        });
    }, [page]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // 在这里处理数据获取和更新逻辑
        console.log(problemdata);
    }

    const updateProblem =({problemId, problemTitle, difficulty,description,hint,category,tags })=>{
        const data = {
            problemId,
            problemTitle,
            difficulty,
            description,
            hint,
            category,
            tags,
        } ;
        console.log("提交数据：", data);
        // 发送数据给后端的代码
        // 例如使用axios发送POST请求
        axios
            .post("http://localhost:8080/updateProblem", data)
            .then((response) => {
                // 处理成功提交后的逻辑
            })
            .catch((error) => {
                // 处理提交失败后的逻辑
            });

    }
    return (
        <div>
            <>
                <ProblemsAdmin
                    title={"题库"}
                    captions={[
                        "序号",
                        "题目",
                        "标签",
                        "难度",
                        "通过率",
                        "最近更新时间",
                        "操作",
                        "删除",
                        "更新"
                    ]}
                    data={problemdata}
                    handleUpdate={updateProblem}
                />
                {problemdata.length === 0 ? (
                    <div style={{ textAlign: "center" }}>
                        <Flex>
                            <h2>当前页已无更多题目</h2>
                        </Flex>
                        <Pagination
                            currentPage={page}
                            totalPages={10}
                            onPageChange={handlePageChange}
                        />
                    </div>
                ) : (
                    <Pagination
                        currentPage={page}
                        totalPages={10}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        </div>
    );
}

export default ProblemListAdmin;
