// Chakra imports
import {Flex,} from "@chakra-ui/react";
// Custom components
import React, {useEffect, useState} from "react";
import {getUserList, getUserListByPage} from "../services/UserSerivce";
import Pagination from "./Tables/Pagination";
import Users from "./Users";
import {getAllProblemByPage} from "../services/ProblemService";

const AdminUsers = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 5; // 每页数量

    useEffect(() => {
        getUserListByPage(page, pageSize, (data) => {
            console.log("users---" + data);
            setUserList(data.data);
        });
    }, [page]);
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
            {userList.length === 0 ? (
                <div style={{ textAlign: "center" }}>
                    <Flex>
                        <h2>当前页已无更多用户</h2>
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
        </Flex>
    );
};

export default AdminUsers;