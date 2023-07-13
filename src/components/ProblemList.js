// ProblemList.jsx

import {Button, Flex} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Problems from "./Problems";
import Pagination from "./Tables/Pagination";
import { getAllProblemByPage } from "../services/ProblemService";

function ProblemList() {
    const [page, setPage] = useState(1);
    const [problemdata, setProblemData] = useState([]);
    const pageSize = 5; // 每页数量

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
    };
    return (
        <div>
                <>
                    <Problems
                        title={"题库"}
                        captions={[
                            "序号",
                            "题目",
                            "标签",
                            "难度",
                            "通过率",
                            "最近更新时间",
                            "操作",
                        ]}
                        data={problemdata}
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

export default ProblemList;
