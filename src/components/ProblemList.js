// // ProblemList.jsx

// import {Button, Flex} from "@chakra-ui/react";
// import React, { useEffect, useState } from "react";
// import Problems from "./Problems";
// import Pagination from "./Tables/Pagination";
// import { getAllProblemByPage } from "../services/ProblemService";

// function ProblemList() {
//     const [page, setPage] = useState(1);
//     const [problemdata, setProblemData] = useState([]);
//     const pageSize = 5; // 每页数量

//     useEffect(() => {
//         getAllProblemByPage(page, pageSize, (data) => {
//             console.log("sss" + data);
//             setProblemData(data.data);
//         });
//     }, [page]);

//     const handlePageChange = (newPage) => {
//         setPage(newPage);
//         // 在这里处理数据获取和更新逻辑
//         console.log(problemdata);
//     };
//     return (
//         <div>
//                 <>
//                     <Problems
//                         title={"题库"}
//                         captions={[
//                             "序号",
//                             "题目",
//                             "标签",
//                             "难度",
//                             "通过率",
//                             "最近更新时间",
//                             "操作",
//                             "更新"
//                         ]}
//                         data={problemdata}
//                     />
//                     {problemdata.length === 0 ? (
//                         <div style={{ textAlign: "center" }}>
//                             <Flex>
//                                 <h2>当前页已无更多题目</h2>
//                             </Flex>
//                             <Pagination
//                                 currentPage={page}
//                                 totalPages={10}
//                                 onPageChange={handlePageChange}
//                             />
//                         </div>
//                     ) : (
//                         <Pagination
//                             currentPage={page}
//                             totalPages={10}
//                             onPageChange={handlePageChange}
//                         />
//                     )}
//                 </>
//         </div>
//     );
// }

// export default ProblemList;


// ProblemList.jsx

import {Button, Flex, Select} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Problems from "./Problems";
import Pagination from "./Tables/Pagination";
import { getAllProblemByPage, getAllCategoryName, getProblemByCategoryAndPage } from "../services/ProblemService";

function ProblemList() {
  const [page, setPage] = useState(1);
  const [problemdata, setProblemData] = useState([]);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const pageSize = 5; // 每页数量

  useEffect(() => {
    getAllCategoryName((data) => {
      setCategories(data.data);
    });
    console.log(categories);
  }, []);

  useEffect(() => {
    if (category === "") {
      getAllProblemByPage(page, pageSize, (data) => {
        setProblemData(data.data);
      });
    } else {
      getProblemByCategoryAndPage(category, page, pageSize, (data) => {
        setProblemData(data.data);
      });
    }
  }, [page, category]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <div>
      <>
        <Flex justifyContent="flex-end" marginBottom="20px">
          <Select value={category} onChange={handleCategoryChange} placeholder="选择分类">
            <option value="">所有问题</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.content}
              </option>
            ))}
          </Select>
        </Flex>
          
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
            "更新"
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
