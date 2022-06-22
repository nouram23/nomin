// const http = require('http');

import axios from "axios";
import fs from "fs";
import mime from "mime-types";


async function SlugPost(slug, data) {
  // const session = await getSession({ req });

  console.log("CALLING URL------------->  ", process.env.URL + "/" + slug);
  

  return new Promise((resolve, reject) => {
    console.log("URL: -> " + `${process.env.URL}/${slug}`);
    axios
      .post(`${process.env.URL}/${slug}`, data, {
        headers: {
          Accept: "application/json",
          ContentType: "application/json"
          // Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQxMzc1MzQ3LCJleHAiOjE2NDM5NjczNDd9.lJd-Xx-b2kHPsBxatVfxqSRBC4Isw8_oV5jViuhsthw",
        },
      })
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
          console.log(error);
        }
      );
  });
}

export default async function handler(req, res) {
  const { slug } = req.query;
  //энд session - user duudna

  if (slug.join("/").indexOf("getFile") !== -1 && req.query.file !== undefined) {    
    const filePath = process.env.UPLOAD_PATH + "/" + req.query.file; 

    fs.readFile(filePath, function (err, content) {
      if (err) {
        fs.readFile("public/images/no-file.png", (err, image) => {
          if (err) {
            res.end("no file");
            console.log(err);
          }
          res.writeHead(200, { "Content-type": "application/vnd.ms-excel" });
          res.end(image);
        });
        console.log(err);
        console.log(err);
      } else {
        const mimeType = mime.lookup(filePath);
        console.log("mimeType: " + mimeType);
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": mimeType });

        res.end(content);
      }
    });
  } 
  
  else if (slug.join("/").indexOf("getVideo") !== -1 && req.query.file !== undefined) {
    // const imagePath = process.env.UPLOAD_PATH_MAC + "/i/" + req.query.file; 
    const videoPath = process.env.UPLOAD_PATH + "/v/" + req.query.file; 
    console.log("video path ---> " + videoPath);

    fs.readFile(videoPath, function (err, content) {
      if (err) {
        fs.readFile(process.env.UPLOAD_PATH + "/no_image.png", (err, video) => {
          if (err) {
            res.end("no video");
            console.log(err);
          }
          res.writeHead(200, { "Content-type": "video/mp4" });
          res.end(video);
        });
        console.log(err);
        console.log(err);
      } else {
        const mimeType = mime.lookup(videoPath);
        console.log("mimeType: " + mimeType);
        //specify the content type in the response will be an image
        res.writeHead(200, { "Content-type": mimeType });

        res.end(content);
      }
    });
  } 
  
  else {
    // await SlugPost(slug.join("/"), req.body, session.accessToken).then(
      
    await SlugPost(slug.join("/"), req.body).then(
      function (response) {
        res.status(200).json(response.data);
      },
      function (error) {
        console.log(error);
      }
    );
  }
}