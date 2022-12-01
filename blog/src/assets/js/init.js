export const createScript = () => {
  const windowWidth = document.querySelector("#app");
  if (this.appendScript || windowWidth.offsetWidth <= 900) return;
  // let script = document.createElement("script");
  script.setAttribute("color", "0,0,0");
  script.setAttribute("opacity", "1");
  script.setAttribute("count", "99");
  script.setAttribute("zIndex", "1");
  script.type = "text/javascript";
  script.src = "https://cdn.bootcss.com/canvas-nest.js/1.0.1/canvas-nest.js";
  document.querySelector("body").children[0].appendChild(script);
  this.appendScript = true;
  this.$nextTick(() => {
    setTimeout(() => {
      let c = document.querySelector("canvas");
      // let c = document.getElementsByTagName("canvas");
      if (!c || c.length === 0) {
        this.appendScript = false;
        return;
      }
      c[c.length - 1].style.pointerEvents = "none";
      c[c.length - 1].style.opacity = "1";
      c[c.length - 1].style.zIndex = "1";
    }, 100);
  });
};
export const removeLogin = () => {
  localStorage.removeItem("JBlogLogin");
  localStorage.removeItem("JUsername");
  localStorage.removeItem("JPassword");
};
export const setBgImg = () => {
  let imgSrc = "url('') no-repeat";

  const bgDom = document.createElement("div");
  const app = document.querySelector("#app");
  // if (app.offsetWidth <= 900) {
  //   imgSrc =
  //     "url('') no-repeat";
  // }
  bgDom.style.position = "fixed";
  bgDom.style.top = 0;
  bgDom.style.background = imgSrc;
  bgDom.style.width = "100vw";
  bgDom.style.height = "100vh";
  bgDom.style.backgroundSize = "cover";
  bgDom.style.backgroundPosition = "center";
  const body = document.querySelector("body").children[0];
  // body.insertBefore(bgDom, app);
};
