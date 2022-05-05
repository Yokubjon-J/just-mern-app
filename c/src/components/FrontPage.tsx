import {useEffect} from "react";
import axios from "axios";

const FrontPage = () => {
    useEffect(() => {
        console.log("Rendering FrontPage");
        axios.get("http://localhost:3001/api/v1/blogposts/posts").
            then(res => {
                console.log("all posts in c:\n", res);
            });
    });
    return (
        <b>MN</b>
    )
}

export default FrontPage;