import mongodb from "mongodb";
import { MongoClient } from "mongodb";
import fs from "fs";

const uri = 'mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority'

async function gridfsConnection(req, res) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("blogsDB");
        const bucket = new mongodb.GridFSBucket(database, { bucketName: 'myImageBucket' });//console.log("req: ", req)
        fs.createReadStream(req.body.image).
            pipe(bucket.
                openUploadStream(req.body.filename,
                    {
                        chunkSizeBytes: 1048576,
                        metadata: { 
                            field: 'from just-mern-app', 
                            contentType:["image/jpeg", "image/jpg", "image/png"],
                        },
                    }).
                on("close", function (file) {
                    console.log(file.filename, "inserted to DB");
                    // return file;
                }));
        await client.close();
        return res.send("file uploaded by GridFS");
    } catch (error) {
        console.log("Error in GridFS connection: ", error);
        return ;
    }
}

export default gridfsConnection;