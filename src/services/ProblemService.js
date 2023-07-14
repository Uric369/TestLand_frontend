import {postRequest, postRequest_v2} from "../utils/ajax";

export function getAllProblemByPage(page, pageSize, callback) {
    const url = `http://localhost:8080/getAllProblemByPage?page=${page}&pageSize=${pageSize}`;

    // 发送请求到后端获取题目数据
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log("data"+data)
            // 调用回调函数将数据传递给 useEffect
            callback(data);
        })
        .catch((error) => {
            console.error("Error fetching problem data:", error);
        });
}



export const getAllProblem = (callback) => {
    const url = `http://localhost:8080/getAllProblem`;
    postRequest(url, null, callback);
};

export const getProblemById = (problemId, callback) => {
    const data = {problemId: problemId};
    const url = `http://localhost:8080/getProblemById`;
    postRequest_v2(url, data, callback);
};
export const DelProblem = (problemId)=>{

    const url = `http://localhost:8080/deleteProblem?problemId=`+problemId;
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            if(data.status<0)
            {
                alert(data.message())
            }
            // 其他逻辑...
        })
        .catch((error) => {
            // console.log(error.message);
        });
    window.location.reload();

}
export const getProblemStatistics = (problemId, callback) => {
    const data = {problemId: problemId};
    const url = `http://localhost:8080/getProblemStatistics`;
    postRequest_v2(url, data, callback);
};


export const getCategory = (callback) => {
    const url = `http://localhost:8080/getCategory`;
    postRequest_v2(url, null, callback);
};