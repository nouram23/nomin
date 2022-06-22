import axios from 'axios';

async function SlugPost(slug, data) {
  return new Promise((resolve, reject) => {
    let params = ''
    for (let key in data) {
      console.log(key);
      console.log(data[key]);
      params += `${key}=${data[key]}&`
    }
    console.log("get url--------> " + `${process.env.URL}/${slug}?${params.substring(0, params.length-1)}`);
    axios
      .get(`${process.env.URL}/${slug}?${params.substring(0, params.length-1)}`)
      .then(
        (result) => {
          resolve(result);
        },
        (error) => {
          reject(error);
        }
      );
  });
}


export default async function handler(req, res) {
  const { slug } = req.query;
  await SlugPost(slug.join("/"), req.body).then(
    function (response) {
      res.status(200).json(response.data);
    },
    function (error) {
      console.log(error);
    }
  );
}




