const mysql = require("mysql");
const dbConfig = require("./dbConfig");
const sqlMap = require("./sqlMap");
const log = require("./log");
const ase = require("./ase");

const err0 = ase.Encrypt(JSON.stringify({ code: 0, msg: "获取数据失败" }));
const err1 = ase.Encrypt(JSON.stringify({ code: 0, msg: "操作失败" }));
const err2 = ase.Encrypt(JSON.stringify({ code: 0, msg: "添加失败" }));
const err3 = ase.Encrypt(JSON.stringify({ code: 0, msg: "修改失败" }));

const pool = mysql.createPool({
  host: dbConfig.mysql.host,
  user: dbConfig.mysql.user,
  password: dbConfig.mysql.password,
  database: dbConfig.mysql.database,
  port: dbConfig.mysql.port,
  multipleStatements: true, // 多语句查询
});

module.exports = {
  //获取博客列表
  getBlogs(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.getBlogs, (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<getBlogs>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }

        log.writeLog(
          "sql:" + sqlMap.article.getBlogs + ";params:" + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取博客详情
  getBlogDetail(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.getBlogDetail,
        [postData.id],
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<getBlogDetail>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }

          log.writeLog(
            "sql:" +
              sqlMap.article.getBlogDetail +
              ";params:" +
              postData.id +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //登录博客
  login(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.other.login,
        [postData.username, postData.password],
        (err, results) => {
          if (err) {
            res.json(err0);
            log.writeLog("<login>" + err, "err");
          } else {
            if (results[0].count == 0) res.json({ code: 2, msg: "密码错误" });
            else if (results[0].count == 1)
              res.json(
                ase.Encrypt(JSON.stringify({ code: 1, data: "登录成功" }))
              );
          }

          log.writeLog(
            "sql:" +
              sqlMap.other.login +
              ";params:" +
              postData.username +
              "," +
              postData.password +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //浏览博客
  visit(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.other.visit, [postData], (err, results) => {
        if (err) {
          res.json(err2);
          log.writeLog("<visit>" + err, "err");
        } else {
          res.json({ code: 1, data: "已添加" });
        }

        log.writeLog(
          "sql:" +
            sqlMap.other.visit +
            ";params:" +
            JSON.stringify(postData) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取标签
  getTag(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.getTag, (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<getTag>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }

        log.writeLog("sql:" + sqlMap.tag.getTag + ";params:" + ";", "sql");
        connection.release();
      });
    });
  },
  //添加类型
  addType(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.type.addType, [postData], (err, result) => {
        if (err) {
          res.json(err2);
          log.writeLog("<addType>" + err, "err");
        } else {
          res.json({ code: 1, data: "成功添加" });
        }
        log.writeLog(
          "sql:" +
            sqlMap.type.addType +
            ";params:" +
            JSON.stringify(postData) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //添加标签
  addTag(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.addTag, [postData], (err, result) => {
        if (err) {
          res.json(err2);
          log.writeLog("<addTag>" + err, "err");
        } else {
          res.json({ code: 1, data: "成功添加" });
        }

        log.writeLog(
          "sql:" +
            sqlMap.tag.addTag +
            ";params:" +
            JSON.stringify(postData) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //删除
  deleteTag(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.tag.deleteTag, [postData.id], (err, result) => {
        if (err) {
          res.json({ code: 0, msg: "删除失败" });
          log.writeLog("<deleteTag>" + err, "err");
        } else {
          res.json({ code: 1, data: "成功删除" });
        }

        log.writeLog(
          "sql:" + sqlMap.tag.deleteTag + ";params:" + postData.id + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取分类
  getType(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.type.getType, (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<getType>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }

        log.writeLog("sql:" + sqlMap.type.getType + ";params:" + ";", "sql");
        connection.release();
      });
    });
  },
  //获取所有评论
  getAllComment(postData, res, next) {
    let { pageSize, index, is_show, clientIp, nickname } = postData;
    let start = 0,
      num = 10;
    if (pageSize && index) {
      start = pageSize * (index - 1);
      num = pageSize;
    }
    let total = 0;
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.getCommentTotal,
        [is_show, is_show, clientIp, nickname],
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<getAllComment>" + err, "err");
          } else {
            total = result[0].count;
          }
        }
      );
      connection.query(
        sqlMap.article.getAllComment,
        [is_show, is_show, clientIp, nickname, start, num],
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<getAllComment>" + err, "err");
          } else {
            res.json(
              ase.Encrypt(
                JSON.stringify({ code: 1, total: total, data: result })
              )
            );
          }
          log.writeLog(
            "sql:" +
              sqlMap.article.getAllComment +
              ";params:" +
              start +
              "," +
              num +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //获取评论
  getComment(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.getComment,
        [postData.id],
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<getComment>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }
          log.writeLog(
            "sql:" + sqlMap.article.getComment + ";params:" + ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //添加评论
  addComment(postData, res, next) {
    const {
      avatar,
      content,
      blog_id,
      parent_comment_id,
      nickname,
      admin_comment,
      email,
      clientIp,
      is_show,
      realIp,
    } = postData;
    const postBody = {
      admin_comment: admin_comment,
      avatar: avatar,
      content: content,
      blog_id: blog_id,
      nickname: nickname,
      parent_comment_id: parent_comment_id,
      email: email,
      clientIp,
      create_time: new Date(),
      is_show: is_show || 0,
      realIp: realIp,
    };
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.addComment, [postBody], (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<addComment>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" +
            sqlMap.article.addComment +
            ";params:" +
            JSON.stringify(postBody) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取归档列表
  getFilingList(postData, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.getFilingList, (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<getFilingList>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }

        log.writeLog(
          "sql:" + sqlMap.article.getFilingList + ";params:" + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //编辑博客
  editBlogById(postData, res, next) {
    const { id, html_content, content, description, title, type_id } = postData;
    const postBody = {
      html_content: html_content,
      content: content,
      description: description,
      title: title,
      type_id: parseInt(type_id),
    };
    if (!postBody.type_id) delete postBody.type_id;
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.editBlogById,
        [postBody, id],
        (err, result) => {
          if (err) {
            res.json(err3);
            log.writeLog("<editBlogById>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }

          log.writeLog(
            "sql:" +
              sqlMap.article.editBlogById +
              ";params:" +
              JSON.stringify(postBody) +
              "," +
              id +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //添加博客
  addBlog(postData, res, next) {
    const { html_content, content, description, title, type_id } = postData;
    const postBody = {
      html_content: html_content,
      type_id: parseInt(type_id),
      content: content,
      description: description,
      title: title,
      views: 0,
      published: 1,
      is_top: "0",
      create_time: new Date(),
    };
    if (!postBody.type_id) delete postBody.type_id;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.addBlog, [postBody], (err, result) => {
        if (err) {
          res.json(err2);
          log.writeLog("<addBlog>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" +
            sqlMap.article.addBlog +
            ";params:" +
            JSON.stringify(postBody) +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  deleteTag2Blog(postBody, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.deleteTag2Blog,
        [postBody.blogid, postBody.tagid],
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<deleteTag2Blog>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }
          log.writeLog(
            "sql:" +
              sqlMap.article.deleteTag2Blog +
              ";params:" +
              JSON.stringify(postBody) +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  addTag2Blog(postBody, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.addTag2Blog,
        postBody.tagIdList,
        (err, result) => {
          if (err) {
            res.json(err0);
            log.writeLog("<addTag2Blog>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }
          log.writeLog(
            "sql:" +
              sqlMap.article.addTag2Blog +
              ";params:" +
              JSON.stringify(postBody.tagIdList) +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
  //浏览博客
  visitBlog(postBody, res, next) {
    const { id } = postBody;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.visitBlog, [id, id], (err, result) => {
        if (err) {
          res.json(err0);
          log.writeLog("<visitBlog>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }

        log.writeLog(
          "sql:" + sqlMap.article.visitBlog + ";params:" + id + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //置顶博客
  toTopBlog(postBody, res, next) {
    const { id, isTop } = postBody;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.toTopBlog, [isTop, id], (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<toTopBlog>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" +
            sqlMap.article.toTopBlog +
            ";params:" +
            isTop +
            "," +
            id +
            ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //删除（隐藏）博客
  deleteBlog(postBody, res, next) {
    const { id } = postBody;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.deleteBlog, [id], (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<deleteBlog>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.article.deleteBlog + ";params:" + id + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取文章阅读量
  getArticleView(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getArticleView, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getArticleView>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getArticleView + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取分类阅读量
  getTypeView(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getTypeView, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getTypeView>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getTypeView + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取每日访问量
  getDateVisit(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getDateVisit, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getDateVisit>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getDateVisit + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取时间段访问量
  getHourVisit(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getHourVisit, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getHourVisit>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getHourVisit + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取城市访问量
  getCityVisit(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getCityVisit, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getCityVisit>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getCityVisit + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //获取城市时间访问量
  getDateCityVisit(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.statistics.getDateCityVisit, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getDateCityVisit>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.statistics.getDateCityVisit + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //未读评论
  getNeedReadComment(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.getNeedReadComment, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<getNeedReadComment>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.article.getNeedReadComment + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  //阅读评论
  readComment(postBody, res, next) {
    const { id } = postBody;
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.readComment, [id], (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<readComment>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.article.readComment + ";id:" + id + ";",
          "sql"
        );
        connection.release();
      });
    });
  },
  //全部已读
  readAllComment(req, res, next) {
    pool.getConnection((err, connection) => {
      connection.query(sqlMap.article.readAllComment, (err, result) => {
        if (err) {
          res.json(err1);
          log.writeLog("<readAllComment>" + err, "err");
        } else {
          res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
        }
        log.writeLog(
          "sql:" + sqlMap.article.readAllComment + ";params:;",
          "sql"
        );
        connection.release();
      });
    });
  },
  setCommentShow(postBody, res, next) {
    let { id, is_show } = postBody;
    is_show = parseInt(is_show);
    pool.getConnection((err, connection) => {
      connection.query(
        sqlMap.article.setCommentShow,
        [is_show, id],
        (err, result) => {
          if (err) {
            res.json(err1);
            log.writeLog("<setCommentShow>" + err, "err");
          } else {
            res.json(ase.Encrypt(JSON.stringify({ code: 1, data: result })));
          }
          log.writeLog(
            "sql:" +
              sqlMap.article.setCommentShow +
              ";params:" +
              is_show +
              "," +
              id +
              ";",
            "sql"
          );
          connection.release();
        }
      );
    });
  },
};
