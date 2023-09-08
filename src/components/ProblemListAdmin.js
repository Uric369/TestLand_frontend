import { Button, Flex, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ProblemsAdmin from "./ProblemsAdmin";
import Pagination from "./Tables/Pagination";
import axios from "axios";
import { getAllProblemByPage, getAllCategoryName, getAllTag, selectProblemByPageAndOthers } from "../services/ProblemService";

function ProblemList() {
  const [page, setPage] = useState(1);
  const [problemdata, setProblemData] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);
  const [difficulty, setDifficulty] = useState("-1");
  const [keyword, setKeyword] = useState("");
  const pageSize = 5; // 每页数量

  useEffect(() => {
    getAllCategoryName((data) => {
      setCategories(data.data);
    });
  }, []);

  useEffect(() => {
    getAllTag((data) => {
      console.log(data.data);
      setTags(data.data);
    });
  }, []);

  useEffect(() => {
    loadProblems();
  }, [page, category, tag, difficulty, keyword]);

  const loadProblems = () => {
    if (category === "" && tag === "" && difficulty === "-1" && keyword === "") {
      getAllProblemByPage(page, pageSize, (data) => {
        setProblemData(data.data);
      });
    } else {
      selectProblemByPageAndOthers(category, tag, difficulty, keyword, page, pageSize, (data) => {
        setProblemData(data.data);
      });
      console.log(category, tag, difficulty, keyword, page, pageSize);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  const handleKeywordChange = (event) => {
    setKeyword(event.target.value);
  };

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
      <br />
        <Flex justifyContent="flex-end" marginBottom="20px">
          <Select value={category} onChange={handleCategoryChange} placeholder="选择分类" marginRight="10px">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.content}
              </option>
            ))}
          </Select>

          <Select value={tag} onChange={handleTagChange} placeholder="选择标签" marginRight="10px">
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.content}
              </option>
            ))}
          </Select>

          <Select value={difficulty} onChange={handleDifficultyChange} placeholder="选择难度" defaultValue="-1" marginRight="10px">
            <option value="0">简单</option>
            <option value="1">中等</option>
            <option value="2">困难</option>
          </Select>

          {/* <input type="text" value={keyword} onChange={handleKeywordChange} placeholder="输入关键字" border="1px solid #ccc" marginRight="10px" /> */}
          <input
            type="text"
            value={keyword}
            onChange={handleKeywordChange}
            placeholder="输入关键字"
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              width: '200px'
            }}
          />

        </Flex>
          
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
          ]}
          data={problemdata}
          handleUpdate={updateProblem}
          keyword={keyword}
        />

          <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={handlePageChange}
          />
      </>
    </div>
  );
}

export default ProblemList;
