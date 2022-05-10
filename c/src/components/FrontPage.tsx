import {useEffect, useState} from "react";
import axios from "axios";
import IndividualPost from './IndividualPost';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const FrontPage = () => {
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        console.log("Rendering FrontPage");
        axios.get("http://localhost:3001/api/v1/blogposts/posts").
            then(res => {
                console.log("all posts in c:\n", res.data);
                setPosts((prevState:any) => {
                    return res.data;
                });
            });
    }, []);//deleting [] will cause infinite loop
    return (
        posts === null ? (
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
        ) : (
            posts.map((post:any, i:number) => <IndividualPost key={post._id} postImage={post.firstImg} title={post.title} content={post.content}/>)
        )
    )
}

export default FrontPage;