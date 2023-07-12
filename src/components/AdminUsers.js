// Chakra imports
import {Flex,} from "@chakra-ui/react";
// Custom components
import React, {useEffect, useState} from "react";
import {getUserList} from "../services/UserSerivce";
import Pagination from "./Tables/Pagination";
import Users from "./Users";

const AdminUsers = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        getUserList((data) => {
            setUserList([...data.data]);
        });
    }, []);
    console.log(userList)
    const handlePageChange = (newPage) => {
        setPage(newPage);
        // 在这里处理数据获取和更新逻辑
        console.log(userList);
    };
    return (
        <Flex direction='column' pt={{base: "100px", md: "50px"}}>
            <Users
                title={"用户信息"}
                captions={["用户Id", "用户名", "头像", "email", "电话", "地址", "状态"]}
                data={userList}
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