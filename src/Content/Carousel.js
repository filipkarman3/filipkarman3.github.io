import { useEffect, useState, useRef, useCallback } from 'react';

function Carousel({path, n}) {
  // image captions
  const [imgCaption, setImgCaption] = useState([
    "My Gilad's tulip attempts. Easy to fold, less easy to fold well.",
    "The box programming room from my Warwick Game Jam submission. It took my teammate two hours to solve.",
    "I have several years of C# experince, having used it for personal standalone projects and Terraria modding.",
    "I've done parsing, gamedev and sat solving in Haskell. It's opened my mind to new solutions even when I'm in OOP mode.",
    "I use python for small projects like spotify playlist generators and webscraping ticket prices.",
    "My introduction to design patterns. They somehow managed to write an engaging computer science textbook.",
    "Resident campus greylags."
  ]);

  // updated when scrolling over div
  const [currentAngle, setCurrentAngle] = useState(0);

  // div reference for element access
  const ref = useRef(null);

  // whether ur hovering over the div or not
  const [isHovering, setIsHovering] = useState(false);

  // as percentage of containing div
  const imgwidth=35;

  // the current image in focus by id
  const [activeImg, setActiveImg] = useState(-1);

  const [scaleList, setScaleList] = useState(Array(n).fill(1));
  const [translateList, setTranslateList] = useState(Array.from({length: n}, () => ({x: 0, y: 0})));
  const getTransform = i => `scale(${scaleList.at(i)}) translate(${translateList.at(i).x}px, ${translateList.at(i).y}px)`

  const setIndex = (setListFunc, i, val) => {
    setListFunc(prev => {
      const newList = [...prev];
      newList[i] = val;
      return newList;
    });
  };

  //----- image repositioning logic -----//
  const rotateCarousel = useCallback(() => {

    // get carousel ref
    const carousel = ref.current;
    if (!carousel) return;

    // get all images in the carousel
    const imgs = carousel.querySelectorAll(".container");

    // angle at which the images are spaced out
    const anglePartition = Math.PI*2/imgs.length;

    // get the image width in px
    const imgwidthreal = carousel.offsetWidth*imgwidth/100;

    // get the radius of the circle
    const radius = (Math.min(carousel.offsetWidth, carousel.offsetHeight) - imgwidthreal)/2;

    const containerRect = carousel.getBoundingClientRect();

    // the frontmost image
    let frontmost = [-1, 0];

    // get the frontmost image and precompute some values along the way
    const angles = [];
    const distsFromFront = [];
    imgs.forEach((img, i) => {
      angles.push( currentAngle + i*anglePartition );
      distsFromFront.push( 1-(Math.sin(angles.at(-1)-Math.PI/2)+1)/2 );

      if (frontmost[1]<=distsFromFront.at(-1)) {
        frontmost = [img.id, distsFromFront.at(-1)];
      }
    });

    setActiveImg(frontmost[0]);

    setTranslateList(prev => {
      const translateList = [...prev];

      // reposition each image based on how much was scrolled
      imgs.forEach((img, i) => {
        // resize the image unless it is the frontmost one
        const scale = (activeImg != img.id) ? 0.3 + 0.7*distsFromFront[i] : 1;
        const rect = img.getBoundingClientRect();
        const newX = (containerRect.width/2  + Math.sin(angles[i])*radius     - rect.width/2/scale)/scale;
        const newY = (containerRect.height/2 + Math.cos(angles[i])*radius*0.6 - rect.height/2/scale)/scale;

        translateList[i] = { x: newX, y: newY };
        setIndex(setScaleList, i, scale);
        img.style.zIndex = Math.round(100*distsFromFront[i]);
      });
      return translateList;
    });
  }, [currentAngle]);

  const [lastScrollTime, setLastScrollTime] = useState(0);
  const scrollWaitTime = 250;

  //----- hook for scrolling the div -----//
  useEffect(() => {
    // handlescroll
    const handleScroll = e => {
      // only scroll the div if ur hovering over it
      if (!ref.current || !isHovering) return;

      e.preventDefault() // prevents scrolling

      // not allowed to scroll for scrollwaittime after scrolling
      if (Date.now() < lastScrollTime + scrollWaitTime) return;

      // get carousel ref
      const carousel = ref.current;
      if (!carousel) return;

      // get all images in the carousel
      const imgs = carousel.querySelectorAll(".container");

      // angle at which the images are spaced out
      const anglePartition = Math.PI*2/imgs.length;

      // rotate the images
      if (e.deltaY > 0) {
        setCurrentAngle(prev => prev + anglePartition);
      } else {
        setCurrentAngle(prev => prev - anglePartition);
      }

      setLastScrollTime(Date.now());
      rotateCarousel();
    }

    window.addEventListener('wheel', handleScroll, {capture:true, passive:false});
    return () => window.removeEventListener('wheel', handleScroll, {capture:true, passive:false});
  }, [isHovering, rotateCarousel, lastScrollTime]);

  // height of the carousel
  const [height, setHeight] = useState(0);

  //----- fix the carousel upon resize -----//
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      if (ref.current) {
        // set height to be same as width
        const width = ref.current.offsetWidth;
        setHeight(width);
      }
    });

    observer.observe(ref.current);
    return () => { observer.disconnect(); }
  }, [height]);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      rotateCarousel();
    });

    observer.observe(ref.current);
    return () => { observer.disconnect(); }
  });

  //----- style functions -----//
  const containerStyle = i => (i!=activeImg) ? {
    width: imgwidth+"%",
    height: "fit-content",
    transition: "transform 0.15s",
    position: "absolute",
    top: "0px",
    left: "0px",
    borderRadius: "4px",
    transform: getTransform(i),
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
  } : {
    top: "0px",
    left: "0px",
    transition: "transform 0.15s",
    width: imgwidth+"%",
    transform: getTransform(i),
    backgroundColor: "white",
    display: "inline-block",
    alignItems: "center",
    position: "absolute",
    borderRadius: "4px",
    border: "4px solid rgb(34, 22, 68)",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
  };

  const imgDivStyle = i => (i!=activeImg) ? {
    width: "100%",
    height:"fit-content",
    borderRadius: "4px"
  } : {
    display: "block",
    // padding: "3px",
    background: "white",
    maxWidth: "100%",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px"
  };

  const imgStyle = i => (i!=activeImg) ? {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "4px"
  } : {
    width: "100%",
    height: "auto",
    display: "block"
  };

  const textStyle = i => (i!=activeImg) ? {
    height: "0px",
    overflow: "hidden",
    width: "0px",
    borderRadius: "4px",
  } : {
    background: "white",
    padding: "10px",
    textAlign: "center",
    color: "#202020",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    fontSize: "13px"
  };

  //----- HTML -----//
  return (
    // image container div
    <div ref={ref} onMouseEnter={() => {setIsHovering(true)}} onMouseLeave={() => {setIsHovering(false)}} style={{
      height:height,
      width:"100%",
      // backgroundColor:"#AAA000",
      position: "relative"
    }}>

        {/* list of images */}
        {[...Array(n)].map((_,i) =>
          /* container div */
          <div id={i} className="container" style={containerStyle(i)}>

            {/* image container */}
            <div style={imgDivStyle(i)}>

              {/* key={i} ref={el => imgsRef.current[i] = el} */}
              <img src={path+(i+1)+".jpg"} alt={(i+1)+".jpg"} style={imgStyle(i)}/>
            </div>

            {/* text container */}
            <div style={textStyle(i)}>
              {imgCaption[i]}
            </div>
          </div>
        )}

    </div>
  );

}
export default Carousel;
