import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface PostProps {
  postImage: string;
  title: string;
  content: string,
}

export default function IndividualPost({postImage, title, content}:PostProps) {
    
  var textToHTML= function (str:string) {
    const parser = new DOMParser(),
      parsedDocument = parser.parseFromString(
        `<html>
          <body>
            <div class="dummy">
              ${str}
            </div>
          </body>
        </html>`, "text/html");
    const divContent = parsedDocument.getElementsByClassName("dummy")[0].innerHTML;
    console.log("l: ", typeof parsedDocument.getElementsByClassName("dummy")[0]);
    return divContent;
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={postImage}
        alt="post image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {content}
        </Typography> */}
        <div>
          {textToHTML(content)}
        </div>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
