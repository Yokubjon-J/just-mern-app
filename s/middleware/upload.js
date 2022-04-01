import mongodb from "mongodb";
import { MongoClient } from "mongodb";
import fs from "fs";
import { Readable } from 'stream'

const uri = 'mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority'

async function gridfsConnection(req, res) {
    try {
        const client = new MongoClient(uri);
        await client.connect();
        const database = client.db("blogsDB");
        const bucket = new mongodb.GridFSBucket(database, { bucketName: 'myImageBucket' });//console.log("req: ", req)
        const buffer = new Buffer.from(req.body.file, 'base64');
        const readable = new Readable();
        readable._read = () => {} //_read is required but you can noop it
        readable.push(buffer);console.log("a'bdushams: ", req.body.file);
        
        readable.
            pipe(bucket.
                openUploadStream(req.body.file,
                    {
                        chunkSizeBytes: 1048576,
                        metadata: { 
                            field: 'from just-mern-app', 
                            contentType:"multipart/form-data"
                            // contentType:["image/jpeg", "image/jpg", "image/png", "image/gif"],
                        },
                    }).
                on("close", function (file) {
                    console.log(file, "inserted to DB");
                    // return file;
            })).
            on("error", function (e) {
                console.log("err isss: ", e);
                res.end(err);
            });
        await client.close();
        return res.send("file uploaded by GridFS");
    } catch (error) {
        console.log("Error in GridFS connection: ", error);
        return ;
    }
}

export default gridfsConnection;