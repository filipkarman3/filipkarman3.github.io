/* KNOWN BUGS:
  after zooming in, scrolling doesn't work for a second or two, have to scroll a bit to get it re-working
  scrolling sometimes rotates carousel in the opposite dir
    occurs when switching scroll dir
  carousel goes too low sometimes because of the text
*/

import './App.css';
import Carousel from "./Content/Carousel";
import Timeline from "./Content/Timeline";
import Blog     from "./Content/Blog";

import { useId, useRef } from 'react';

function App() {
  const colorEven="#888888";
  const colorOdd="#999999";
  const aboutMeRef=useRef(null);
  const aboutPageRef=useRef(null);
  const blogRef=useRef(null);
  const aboutMeCarouselRef=useRef(null);

  const scrollTo = (ref) => () => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page" style={{background:colorOdd}}>
      {/* The header with logo + navigation buttons */}
      <div className="headbar-sized headbar">

        <div className="home-button">
          <button onClick={scrollTo(aboutMeRef)}>Filip Karman</button>
        </div>

        <div className="spacer" />

        <div className="nav-buttons">

          <div className="nav-button">
            <button onClick={scrollTo(aboutMeRef)}>About me</button>
          </div>

          <div className="nav-button">
            <button onClick={scrollTo(aboutPageRef)}>About this page</button>
          </div>

          <div className="nav-button">
            <button onClick={scrollTo(blogRef)}>My blog</button>
          </div>

        </div>
      </div>

      {/* The main webpage */}
      <div className="content-wrapper">
        {/* Functions as an offset to prevent content from appearing under the headbar */}
        <div className="headbar-sized"></div>

        {/* Content wrapper to allow for scroling */}
        <div className="content-flex">
          {/* secondary content wrapper */}
          <div className="content">
            {/* About me horizontal section */}
            <div className="content-box" ref={aboutMeRef} style={{background: colorOdd}}>
              {/* About me text */}
              <div className="content-text">
                Hi, my name is Filip Karman and I'm currently studying computer science at University of Warwick. From React to Unity to Haskell, I've explored a vast array of programming languages, paradigms, APIs and libraries. You can find some of my projects listed in the blog below! Aside from studies and miscellaneous IT projects, I spend the rest of my time reading, gardening, learning languages, doing sports or folding paper.
                <br/><br/>
                On the right are some images related to me. Scroll through them and a corresponding caption will come up!
              </div>

              {/* Carousel */}
              <div style={{flex:1}}>
                <Carousel
                  path="img/about-me-carousel/"
                  n={7}
                />
              </div>
            </div>

            <WaveTransition colortop={colorOdd} colorbottom={colorEven} />
            
            {/* About this page */}
            <div className="content-box" ref={aboutPageRef} style={{background: colorEven}}>
              {/* Timeline */}
              <div style={{flex:1}}>
                <Timeline/>
              </div>

              {/* About this page text */}
              <div className="content-text">
                About This Page:<br/><br/>
                Getting to grips with React was a nightmare. I found myself frequently re-writing half-working code and doing anything remotely complicated took enormous amounts of time. Hence the first version of this website was fairly dull and I avoided React's features as much as possible. But this year I decided to take the proper approach and in doing so, I have become much more confident with the framework. It has taken quite some time to get my head around the more functional-oriented nature of React - but now that I have done so, I have had some fun figuring out novel solutions to problems I have encountered and taking advantage of the framework's capabilities to improve load times and responsiveness.
              </div>
            </div>

            <WaveTransition colortop={colorEven} colorbottom={colorOdd} />

            {/* Blog */}
            <div className="content-box" ref={blogRef} style={{background: colorOdd}}>
              <Blog/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WaveTransition({colortop, colorbottom}) {
  const waveId = useId();

  return (
    <div className="wave-div" style={{background:colortop}}>
      <svg viewBox="0 0 300 10" preserveAspectRatio="none" style={{width:"100%",height:"100%"}}>
        <pattern id={waveId} patternUnits="userSpaceOnUse" width="100" height="10">
          <path 
            d="M0,0
              C25,0 25,9 50,9
              C75,9 75,0 100,0
              L100,10 L0,10, Z" 
            fill={colorbottom}
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#${waveId})`} />
      </svg>
    </div>
  );
}

export default App;