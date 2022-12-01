/*
 * @Author: zheng yong tao
 * @Date: 2022-02-09 22:28:56
 * @LastEditors: zheng yong tao
 * @LastEditTime: 2022-03-15 00:27:47
 * @Description:
 */
var sqlMap = {
  article: {
    getBlogs:
      "select views, id,title,type_id,(select name from t_type where t_type.id = t_blog.type_id) type_name,(select group_concat(name) from t_tag where t_tag.id in (select tagid from t_blog_tags where blogid = t_blog.id)) tags,(select count(1) from t_comment where blog_id = t_blog.id and is_show = 1) commentNums, description,create_time,char_length(content) as length,is_top from t_blog where published = 1 ORDER BY is_top desc,create_time desc",
    getBlogDetail:
      "select *,(select group_concat(tagid) from t_blog_tags where blogid = id) tags,create_time,char_length(content) as length from t_blog where published = 1 AND id = ?",
    getFilingList:
      "select DATE_FORMAT(create_time,'%Y') year,DATE_FORMAT(create_time,'%m') month,id,title,create_time from t_blog where published = 1 ORDER BY create_time desc",
    editBlogById: "update t_blog set ? where id=?",
    addBlog: "insert into t_blog set ?",
    visitBlog:
      "UPDATE t_blog SET views = (SELECT ub.views FROM (SELECT (ua.views+1) views FROM t_blog ua WHERE ua.id = ?) ub ) WHERE id = ?",
    toTopBlog: "update t_blog set is_top= ? where id=?",
    deleteBlog: "update t_blog set published=0 where id=?",
    // addTag2Blog: "insert into t_blog_tags(`blogid`,`tagid`) values ?",
    addTag2Blog: "insert into t_blog_tags set ?",
    deleteTag2Blog: "delete from t_blog_tags where blogid = ? and tagid = ?",
    getComment:
      "SELECT id,avatar,content,admin_comment,parent_comment_id,nickname,create_time FROM t_comment where blog_id = ? and is_show = 1",
    addComment: "insert into t_comment set ?",
    getNeedReadComment:
      "select id,avatar,content,nickname,create_time,(select title from t_blog where blog_id = t_blog.id) blog_name,blog_id FROM t_comment where is_read = 0 and admin_comment = 0;",
    readAllComment: "update t_comment set is_read = 1 where is_read = 0",
    readComment: "update t_comment set is_read = 1 where id = ?",
    getAllComment:
      "select * from t_comment where case ?\
      when -1 then is_show != -1\
      else is_show = ?\
    end \
    and clientIp like CONCAT('%',?,'%')\
    and nickname like CONCAT('%',?,'%')\
    and admin_comment = 0 ORDER BY create_time limit ?,?",
    // "SELECT * FROM t_comment where admin_comment = 0 ORDER BY create_time LIMIT ?,?",
    getCommentTotal:
      "SELECT count(1) as count FROM t_comment where case ?\
        when -1 then is_show != -1\
        else is_show = ?\
      end \
      and clientIp like CONCAT('%',?,'%')\
      and nickname like CONCAT('%',?,'%')\
      and admin_comment = 0",
    setCommentShow: "update t_comment set is_show = ? where id = ?",
  },
  type: {
    getType: "select * from t_type",
    addType: "insert into t_type set ?",
    deleteType: "update t_type set published=0 where id=?",
  },
  tag: {
    getTag: "select * from t_tag where published=1",
    addTag: "insert into t_tag set ?",
    deleteTag: "delete from t_tag where id=?",
  },
  other: {
    login:
      "select count(1) as count from t_user where username=? and password=?",
    visit: "insert into t_visit_list set ?",
  },
  statistics: {
    getArticleView:
      "select views,id,title from t_blog where published = 1 ORDER BY views desc",
    getTypeView:
      "select sum(views) views,type_id,(select name from t_type where id = type_id) type_name from t_blog where published = 1 group by type_id ORDER BY views desc",
    getDateVisit:
      "select sum(1) visits,left(time,10) date from t_visit_list where time is not null group by left(time,10) order by time desc",
    getHourVisit:
      "select sum(1) visits,substring(time,12,2) hour from t_visit_list group by substring(time,12,2) order by visits desc",
    getCityVisit:
      "select sum(1) visits,cname,cid from t_visit_list group by cname order by visits desc",
    getDateCityVisit:
      "select sum(1) visits,left(time,10) date,cname from t_visit_list group by left(time,10),cname order by visits desc",
  },
};
module.exports = sqlMap;
