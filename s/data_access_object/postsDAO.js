import mongodb from "mongodb";
import { Readable } from 'stream';

let client, posts, database, bucket;

export default class PostsDAO {

    static async injectDB(conn) {
        if (posts) {
          return ;
        }
        try {
            client = conn;
            database = await conn.db("blogsDB");
            posts = await database.collection("posts");
            bucket = new mongodb.GridFSBucket(database, { bucketName: 'myImageBucket' });
        } catch (e) {
          console.error(
            `Unable to establish a collection handle in PostsDAO: ${e}`,
          );
        }
    }

    static gridfsConnection = async (req, res) => {
        try {
            Readable.from(Buffer.from(req.body.file, 'base64')).
            pipe(bucket.
                openUploadStream(req.body.filename,
                    {
                        chunkSizeBytes: 1048576,
                        metadata: { 
                            field: 'from just-mern-app', 
                        },
                    })
            ).
            on("error", function (e) {
                console.log("err isss: ", e);
            }).
            on("finish", function (file) {
                console.log(file, "\n inserted to DB");
                res.send("file uploaded by GridFS");
            });
        } catch (error) {
            console.log("Error in GridFS connection: ", error);
        }//finally{res.send("file uploaded by GridFS")} won't work
    }

    static gridfsImageDownload = async (req, res) => {
        try {
            const readStream = bucket.openDownloadStreamByName(req.query.filename);
            res.contentType(req.query.type);
            readStream.pipe(res);
        } catch (error) {
            console.log("* error while retrieving image: *\n", e);
        }
    }

    static savePost = async (req, res) => {
        try {
            // Specifying a Schema is optional, but it enables type hints on
            // finds and inserts
            const result = await posts.insertOne({
              title: req.body.title,
              content: req.body.content,
              firstImg: req.body.firstImg,
            });
            console.log(`A document was inserted, ${req.body}`);
            res.status(200).send("POST request fulfilled!");//this will be sent to client. To access this message on the client, you must write "res.data" in your react code.
        } catch(e) {
            await client.close();
        }
    }

    static retrievePosts = async (req, res) => {
        try {
            const allPosts = await posts.find({}).toArray();
            await res.send(allPosts);
        } catch (error) {
            console.log(error);
        }
    };

}