import mongodb from "mongodb";
import { MongoClient, ServerApiVersion } from "mongodb";
import fs from "fs";
import { Readable } from 'stream'

const uri = 'mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority'

async function gridfsConnection(req, res, next) {
    //if client declaration below is outside of the func, the server will crash. don't know the reason
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect(err => {
            const database = client.db("blogsDB"); //console.log("cdb: \n", client.db());
            const bucket = new mongodb.GridFSBucket(client.db(), { bucketName: 'myImageBucket' });
            Readable.from(Buffer.from(req.body.file, 'base64')).
            pipe(bucket.
                openUploadStream(req.body.filename,
                    {
                        chunkSizeBytes: 1048576,
                        metadata: { 
                            field: 'from just-mern-app', 
                            // contentType:"multipart/form-data"
                            // contentType:["image/jpeg", "image/jpg", "image/png", "image/gif"],
                        },
                    })
            ).
            on("error", function (e) {
                console.log("err isss: ", e);
            }).
            on("finish", function (file) {
                console.log(file, "\n inserted to DB");
                res.send("file uploaded by GridFS");
                client.close();
            });
        });
    } catch (error) {
        console.log("Error in GridFS connection: ", error);
    }//finally{res.send("file uploaded by GridFS")} won't work
}

export const gridfsImageDownload = async (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
    try {
        await client.connect(e => {
            const database = client.db("blogsDB");
            const bucket = new mongodb.GridFSBucket(database, { bucketName: 'myImageBucket' });
            const readStream = bucket.openDownloadStreamByName(req.query.filename);
            res.contentType(req.query.type);
            readStream.pipe(res);
        });
    } catch (error) {
        console.log("* error while retrieving image: *\n", e);
    } finally {
        await client.close();
    }
}

export default gridfsConnection;