// Chakra imports
import {Flex} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import Problems from "./Problems";
import Pagination from "./Tables/Pagination";
import {getAllProblem} from "../services/ProblemService";

function ProblemList() {
    const [page, setPage] = useState(1);
    const [problemdata, setProblemData] = useState([]);

    useEffect(() => {
        getAllProblem((data) => {
            setProblemData([...data.data]);
        });
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        // 在这里处理数据获取和更新逻辑
        console.log(problemdata);
    };
    return (
        <Flex direction='column' pt={{base: "100px", md: "50px"}}>
            <Problems
                title={"题库"}
                captions={["序号", "题目", "标签", "难度", "通过率", "最近更新时间", "操作"]}
                data={problemdata}
            />
            <Pagination
                currentPage={page}
                totalPages={10}
                onPageChange={handlePageChange}
            />
        </Flex>
    );
}

export default ProblemList;
