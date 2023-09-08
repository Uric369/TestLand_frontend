import { Flex, Input, Box} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getUserListByPage, searchUsersByUsername } from "../services/UserSerivce"; // Assuming you have a search function
import Pagination from "./Tables/Pagination";
import Users from "./Users";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const AdminUsers = () => {
  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState(""); // State for the search keyword
  const pageSize = 5; // 每页数量

  useEffect(() => {
    getUserListByPage(page, pageSize, (data) => {
      setUserList(data.data);
    });
  }, [page]);

  useEffect(() => {
    // Perform a user search when the searchKeyword changes
    if (searchKeyword !== "") {
      searchUsersByUsername(page, pageSize,searchKeyword, (data) => {
        setUserList(data.data);
      });
    } else {
      // If the search keyword is empty, fetch the regular user list
      getUserListByPage(page, pageSize, (data) => {
        setUserList(data.data);
      });
    }
  }, [searchKeyword, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  return (
    <Flex direction="column" pt={{ base: "100px", md: "50px" }}>
      <Box
        width="100%"
        maxWidth="400px" 
        marginBottom="2rem"
      >
        <Input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="输入用户名关键词"
          size="md"
        />
      </Box>

      <Users
        title={"用户信息"}
        captions={["用户Id", "用户名", "头像", "邮箱", "电话", "地址", "状态", "操作"]}
        data={userList}
        keyword={searchKeyword}
      />
      <Pagination
            currentPage={page}
            totalPages={10}
            onPageChange={handlePageChange}
        />
    </Flex>
  );
};

export default AdminUsers;
