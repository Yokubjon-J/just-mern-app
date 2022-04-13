import mongodb from "mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";
import fs from "fs";
import { Readable } from 'stream'

const uri = 'mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority'

async function gridfsConnection(req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    
    const readable = new Readable({
        read(){
            const buffer = new Buffer.from(req.body.file, 'base64');
            this.push(buffer);
        }
    });
    let bucket;
    try {
        console.log("readable: ", readable, "0-0-0-0");
        await client.connect(err => {
            const database = client.db("blogsDB");
            bucket = new mongodb.GridFSBucket(database, { bucketName: 'myImageBucket' });
            readable.
            pipe(bucket.
                openUploadStream("someImage",
                    {
                        chunkSizeBytes: 1048576,
                        metadata: { 
                            field: 'from just-mern-app', 
                            // contentType:"multipart/form-data"
                            // contentType:["image/jpeg", "image/jpg", "image/png", "image/gif"],
                        },
                    }).
                on("close", function (file) {
                    console.log(file, "inserted to DB");
                    // return file;
                }).on("error", function (e) {
                    console.log("err isss: ", e);
                    res.end(err);
                    client.close(); return;
                })
            ).
            on("error", function (e) {
                console.log("err isss: ", e);
                res.end(err);
                client.close(); return;
            });
        });
    } catch (error) {
        console.log("Error in GridFS connection: ", error);
        return ;
    } finally {
        res.send("file uploaded by GridFS");
        await client.close();
    }
}

export default gridfsConnection;