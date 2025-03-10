import fs from "fs";

export function endpoints(req, res, next) {
  return fs.readFile("endpoints.json", (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send("File Reading Server Error");
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).send(jsonData);
    } catch (parseError) {
      return res.status(500).send("Server Error");
    }
  });
}
