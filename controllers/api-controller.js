import fs from "fs"

export function endpoints(req,res,next){
    console.log("here")
    return fs.readFile("endpoints.json", (err, data) => {
        if (err){
            console.error(err);
            return res.status(500).send('File Reading Server Error');
        }
        try{
            const jsonData = JSON.parse(data);
            console.log(typeof jsonData)
            res.status(200).send(jsonData); 
          } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            return res.status(500).send('Server Error');
          }
  
    })
}