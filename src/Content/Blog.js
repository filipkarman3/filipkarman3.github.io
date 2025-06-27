import { useEffect, useState, useRef, useCallback } from 'react';

import './Blog.css';
import Entries from "./Entries";

function Blog() {
  const canvasRef = useRef(null);
  const entriesRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    const observer = new ResizeObserver((e) => {
      if (!canvasRef.current || !entriesRef.current) { return; }

      const canvas = canvasRef.current;
      const entriesDiv = entriesRef.current;

      // resize canvas to be the height of blog entries container
      const rect = entriesDiv.getBoundingClientRect();
      setHeight(rect.height);
      canvas.width = rect.width;
      canvas.height = rect.height;

      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;
      ctx.lineWidth = rect.width/10;
      ctx.strokeStyle = "rgb(137, 113, 145)";

      ctx.beginPath();
      const entries = entriesDiv.querySelectorAll("#blogentry");
      for (let i=0; i<entries.length-1; i++) {
        const img1Rect = entries[i].getBoundingClientRect();
        const img1X    = img1Rect.left + img1Rect.width/2 - rect.left;
        const img1Y    = img1Rect.top  + img1Rect.height/2 - rect.top;
        
        const img2Rect = entries[i+1].getBoundingClientRect();
        const img2X    = img2Rect.left + img2Rect.width/2 - rect.left;
        const img2Y    = img2Rect.top  + img2Rect.height/2 - rect.top;
        
        ctx.moveTo(img1X, img1Y);
        if (i%2==0) {
          ctx.bezierCurveTo(img2X, img1Y, img2X, img1Y, img2X, img2Y);
        } else {
          ctx.bezierCurveTo(img2X, img1Y, img2X, img1Y, img2X, img2Y);
        }
        ctx.stroke();        
      }
    });

    observer.observe(entriesRef.current);
    return () => { observer.disconnect(); }
  }, []);


  return (
    <div style={{width:"100%", position:"relative"}}>

      {/* the background canvas snaking line */}
      <div style={{
        width:"100%",
        position:"absolute",
        top: "0px",
        left: "0px",
        zIndex:1
      }}>
        
        <canvas ref={canvasRef} style={{
          width:"100%",
          // background:"red",
          height:height
        }}>
          Sorry, your browser does not support canvas.
        </canvas>
      
      </div>

      {/* the blog entries */}
      <div ref={entriesRef} style={{
        width:"100%",
        display:"flex",
        flexDirection:"column",
        position:"absolute",
        top: "0px",
        left: "0px",
        zIndex:2
      }}>
        
        {Entries.map((entry, i) => (
          // width spanning the whole page horizontally
          <div style={{
            width:"100%",
            borderRadius:"20px",
            height:"fit-content"
          }}>
          
            {/* nested div containing content that only spans left or right half */}
            <div id="blogentry" key={i} style={{
              width:"50%",
              borderRadius:"20px",
              background:"#EEEEEE",
              padding:"40px",
              margin:"20px",
              transition: "transform 0.5s ease",
              boxShadow:"rgba(0, 0, 0, 0.35) 0px 5px 15px",
              float:i%2==0 ? "left" : "right"
            }}
            >
              <h3 style={{color:"#606060"}}>{entry.title}</h3>
              <p style={{color:"#888888"}}>{entry.date}</p>
              <p style={{color:"#666666", textAlign:"justify"}}>{entry.content}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Blog;