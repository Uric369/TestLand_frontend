import { postRequest,postRequest_v2 } from "../utils/ajax";

export const addPost = (data, callback) => {
    const url = `http://localhost:8080/addPost`;
    postRequest(url, data, callback);
};

export const getPosts = (callback) => {
    const url = `http://localhost:8080/getPosts`;
    postRequest(url, null, callback);
};

export const getPostByPostId = (postId, callback) => {
    const data = {postId: postId};
    console.log("bypostId")
    console.log(data);
    const url = `http://localhost:8080/getPostByPostId`;
    postRequest_v2(url, data, callback);
};


