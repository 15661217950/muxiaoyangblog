/*
 * @Author: zheng yong tao
 * @Date: 2022-01-15 18:07:58
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-13 23:13:23
 * @Description:
 */
import { dbConfig } from "./config.js";

const getFullPath = function(path) {
  const url = dbConfig.url,
    port = dbConfig.port;
  return url + ":" + port + path;
};

export const editBlog = getFullPath("/editblog");
export const getBlogByPage = getFullPath("/");
export const getBlogs = getFullPath("/getblogs");
export const getBlogDetail = getFullPath("/getBlogDetail");
export const editBlogById = getFullPath("/editBlogById");
export const login = getFullPath("/login");
export const visit = getFullPath("/visit");
export const addBlog = getFullPath("/addBlog");
export const addTag2Blog = getFullPath("/addTag2Blog");
export const deleteTag2Blog = getFullPath("/deleteTag2Blog");
export const toTopBlog = getFullPath("/toTopBlog");
export const deleteBlog = getFullPath("/deleteBlog");
export const getFilingList = getFullPath("/getFilingList");
export const visitBlog = getFullPath("/visitBlog");
export const getType = getFullPath("/getType");
export const addType = getFullPath("/addType");
export const getTag = getFullPath("/getTag");
export const addTag = getFullPath("/addTag");
export const deleteTag = getFullPath("/deleteTag");
export const getArticleView = getFullPath("/getArticleView");
export const getTypeView = getFullPath("/getTypeView");
export const getDateVisit = getFullPath("/getDateVisit");
export const getHourVisit = getFullPath("/getHourVisit");
export const getCityVisit = getFullPath("/getCityVisit");
export const getDateCityVisit = getFullPath("/getDateCityVisit");
export const getComment = getFullPath("/getComment");
export const addComment = getFullPath("/addComment");
export const getNeedReadComment = getFullPath("/getNeedReadComment");
export const readComment = getFullPath("/readComment");
export const readAllComment = getFullPath("/readAllComment");
export const getAllComment = getFullPath("/getAllComment");
export const setCommentShow = getFullPath("/setCommentShow");

// export default {
//   editBlog: getFullPath("/editblog"),
//   getBlogByPage: getFullPath("/") //getblogbypage
// };
