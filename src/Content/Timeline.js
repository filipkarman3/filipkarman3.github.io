import { useEffect, useState, useRef } from 'react';
import './Timeline.css';

function Timeline() {
  // div reference for element access
  const ref = useRef(null);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const [img1Pos, setImg1Pos] = useState({top: 0, left: 0});
  const [img2Pos, setImg2Pos] = useState({top: 0, left: 0});
  const imgWidth = 40;
  const [height, setHeight] = useState(0);

  const updateCanvas = () => {
    const tl = ref.current;
    if (!tl) return;

    const dpr = window.devicePixelRatio || 1;

    const rect = tl.getBoundingClientRect();
    tl.width  = rect.width;
    tl.height = rect.height;

    const n = x => Math.round(x/100*tl.width);

    const ctx = tl.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.lineWidth = 2;
  
    ctx.beginPath();
    
    // the timeline
    ctx.moveTo(n(10), n(50));
    ctx.lineTo(n(90), n(50));
    ctx.stroke();

    // left terminus
    ctx.moveTo(n(10), n(47));
    ctx.lineTo(n(10), n(53));
    ctx.stroke();

    // right terminus
    ctx.moveTo(n(90), n(47));
    ctx.lineTo(n(90), n(53));
    ctx.stroke();
    
    ctx.closePath();
    ctx.beginPath();
    ctx.setLineDash([9,4]);
    
    // old webpage line
    ctx.moveTo(n(35), n(50));
    ctx.lineTo(n(35), n(70));
    ctx.stroke();

    // new webpage line
    ctx.moveTo(n(65), n(50));
    ctx.lineTo(n(65), n(30));
    ctx.stroke();

    // console.log({ left: n(35-imgWidth/2), top: n(70) });
    setImg1Pos( () => ({ left: n(35-imgWidth/2), top: n(70) }) )
    setImg2Pos( () => ({ left: n(65-imgWidth/2), top: n(30) - (img2.current?.offsetHeight || 0) }) )
  }

  //----- update timeline upon resize -----//
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (ref.current) {
        // set height to be same as width
        const width = ref.current.offsetWidth;
        setHeight(width);
      
        const tryReset = () => {
          const style = ref.current.getBoundingClientRect();
        
          // let the page re-render
          requestAnimationFrame(() => {
            setTimeout(() => {
              // allows for some leniency bc css may offset set positions by a minimal amount of pixels
              const setCorrectly = Math.abs(style.height - style.width) < 5;

              if (setCorrectly) {
                requestAnimationFrame(updateCanvas);
              } else {
                tryReset();
              }
            }, 10);
          });
        };

        tryReset();
      }
    });

    observer.observe(ref.current);
    return () => { observer.disconnect(); }
  }, [height]);

  const imgStyle = imgPos => ({
    width: imgWidth+"%",
    height: "auto",
    position: "absolute",
    borderRadius: "2px",
    border: "3px solid white",
    top: imgPos.top,
    left: imgPos.left,
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    transition: "all 0.3s ease"
  });

  return (
    <div style={{position: "relative"}}>
      <canvas ref={ref} style={{
        width:"100%",
        height:height
      }}>
        Sorry, your browser does not support canvas.
      </canvas>

      <img id="tlimg" src="img/timeline/old-blog.png" style={imgStyle(img1Pos)} ref={img1} alt="old-page.png"/>
      <img id="tlimg" src="img/timeline/new-blog.png" style={imgStyle(img2Pos)} ref={img2} alt="new-page.png"/>
    </div>
  );
}

export default Timeline;