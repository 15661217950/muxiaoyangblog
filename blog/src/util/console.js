export const requestLog = (text, url, params) => {
  console.log(
    `%c ${text} %c ${url} %c`,
    "background:#858b9c ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#0282cb ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent",
    params
  );
};
export const responseLog = (text, url, params) => {
  console.log(
    `%c ${text} %c ${url} %c`,
    "background:#41b883 ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff",
    "background:#0282cb ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff",
    "background:transparent",
    params
  );
};
