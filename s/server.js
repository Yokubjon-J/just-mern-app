import express from "express";
import blogs from './api/server.routes.js';
// import blogs from './api/server2.routes.js';
import PostsDAO from "./data_access_object/postsDAO.js";
import cors from "cors";
import mongodb from 'mongodb';
const app = express();
const port = "3001";
const connectionString = "mongodb+srv://justadmin:justadminn@cluster0.pvwjg.mongodb.net/blogsDB?retryWrites=true&w=majority";
const MongoClient = mongodb.MongoClient;

// Body parsing Middleware
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));//console.log("j: ", blogs);
app.use("/api/v1/blogposts", blogs); //this is the URL through which we'll make REST req-s and all CRUD func-s and routes will be inside blogs file
app.use("*", (req, res) => res.status(404).json({error:"π¨π¦π₯π§πβ¬οΈππ§π₯π¦π¨"}));

MongoClient.connect(
    connectionString,
    {
        // poolSize: 50,
        useNewUrlParser: true,
        wtimeoutMS: 4000,
    })
.catch((error) => {
    console.log("π¦π₯π§πβ¬οΈππ§π₯π¦");
    console.error(error.stack);
    process.exit(1);
})
.then(async (client)=>{
    try {
        await PostsDAO.injectDB(client);
        app.listen(port, () => {   //if DB connection is successful, start listening
            console.log(`πππππConnected to port ${port}πππππ`);
        });
    } catch (error) {
        console.error(`Error occured: ${error.message}`);
    }
});

export default app;