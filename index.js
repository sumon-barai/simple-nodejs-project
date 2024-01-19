const http = require("http");
const path = require("path");
const fs = require("fs");
const url = require("url");

const PORT = 5000;

const server = http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  const reqPath = urlObj.pathname;

  // home route
  if (reqPath === "/") {
    const filePath = path.join(__dirname, "page", "home.html");
    res.writeHead(200, { "Content-Type": "text/html" });

    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
    // contact route
  } else if (reqPath === "/contact") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "page", "contact.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
    // about route
  } else if (reqPath === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "page", "about.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
    // createUser route
  } else if (reqPath === "/createUser") {
    // only submit button
    if (urlObj.query.userName && urlObj.query.number) {
      const userInfo = {
        userName: urlObj.query.userName,
        number: urlObj.query.number,
      };

      const targetPath = path.join(
        __dirname,
        "database",
        `${urlObj.query.number}.json`
      );
      fs.writeFile(targetPath, JSON.stringify(userInfo), (err) => {
        if (err) {
          console.log("file save error ");
        }
      });
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "page", "createUser.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
    // for css file
  } else if (reqPath === "/readUser") {
    let userInfo = "";
    // only submit button
    if (urlObj.query.number) {
      const targetPath = path.join(
        __dirname,
        "database",
        `${urlObj.query.number}.json`
      );
      fs.readFile(targetPath, "utf-8", (err, data) => {
        if (err) {
          userInfo = "No user found";
        } else {
          const infoObj = JSON.parse(data);
          userInfo = `<div>
            <h4>${infoObj.userName}</h4>
            <h5>${infoObj.number}</h5>
          </div>`;
        }
      });
    }

    res.writeHead(200, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "page", "readUser.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        data = data.replace("{{userInfo}}", userInfo);
        res.end(data);
      }
    });
    // for css file
  } else if (req.url.match(/.css$/)) {
    res.writeHead(200, { "Content-Type": "text/css" });
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
    // not found route
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    const filePath = path.join(__dirname, "page", "NoPage.html");
    fs.readFile(filePath, "utf-8", (error, data) => {
      if (error) {
        res.end("something is wrong");
      } else {
        res.end(data);
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});
