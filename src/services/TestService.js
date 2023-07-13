import {postRequest,postRequest_v2} from "../utils/ajax";
import {history} from '../utils/history';
import {message} from 'antd';


export const test = (data,callback) => {
    const url = `http://localhost:8080/test`;
    postRequest(url,data, callback);
};



export const getTestCaseInfo = (userId,problemId,callback) => {
    // const data={userId:userId,problemId:problemId};
    //  console.log(data);
    const url = `http://localhost:8080/getTestCaseInfo?userId=${userId}&problemId=${problemId}`;
    postRequest(url,null, callback);
};



// export const getTestHistoryList = (userId, problemId, setData) => {
//     const url = 'http://localhost:8080/getTestHistoryList?userId=' + userId + '&problemId=' + problemId;
//     console.log(url);
//     const callback = (response) => {
//         console.log(response);
//         if (response.status >= 0) {
//             console.log(response.data);
//             setData(response.data);
//         } else {
//             alert(response.message);
//         }
//     };
//     postRequest(url, null, callback);
// };


export const getCodeHistory = (userTestId,callback) => {
    // const data={userId:userId,problemId:problemId};

    const data={userTestId:userTestId};
    console.log(data)
    const url = `http://localhost:8080/getCodeHistory`;
    postRequest_v2(url,data, callback);
};


export const getTestHistoryList = (userId,problemId,callback) => {
    // const data={userId:userId,problemId:problemId};

    const data={userId:userId,problemId:problemId};
    console.log(data)
    const url = `http://localhost:8080/getTestHistoryList`;
    postRequest_v2(url,data, callback);
};



