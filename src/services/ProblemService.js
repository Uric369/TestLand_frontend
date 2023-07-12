import {postRequest, postRequest_v2} from "../utils/ajax";


export const getAllProblem = (callback) => {
    const url = `http://localhost:8080/getAllProblem`;
    postRequest(url, null, callback);
};

export const getProblemById = (problemId, callback) => {
    const data = {problemId: problemId};
    const url = `http://localhost:8080/getProblemById`;
    postRequest_v2(url, data, callback);
};


export const getProblemStatistics = (problemId, callback) => {
    const data = {problemId: problemId};
    const url = `http://localhost:8080/getProblemStatistics`;
    postRequest_v2(url, data, callback);
};


export const getCategory = (callback) => {
    const url = `http://localhost:8080/getCategory`;
    postRequest_v2(url, null, callback);
};