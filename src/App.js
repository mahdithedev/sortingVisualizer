import React, { useState , useEffect } from 'react'
import './App.css';
import { Bar } from './Bar';
import boubleSort from './sortFunctions/boublesort';
     
function App() {

  const [speed , setSpeed] = useState(1)
  const [bars , setBars] = useState([])


  async function genrate(size) {

     let array = []
     
     for(let i=0 ; i<size ; i++)  {
        let bar = {}
        bar.value = Math.floor(Math.random() * 495) + 5
        bar.color = "crimson"
        bar.i = i
        array.push(bar)
      }

      
      await setBars([...array])
      
  }

  function sizeHandler() {
      const size =  document.getElementById('sizeRange').value
      document.getElementById('size').innerHTML = size
      genrate(size)
  }

  function speedHandler() {
     setSpeed(document.getElementById('speedRange').value)
  }

   function sort() {
    
     let animations = boubleSort([...bars])

       for(let i=0 ; i<animations.length ; i++)
       {
           setTimeout(() => {
             const animation = animations[i]
            if(animation.move == 'compare') {
             document.getElementById(animation.bars[0]).style.backgroundColor = 'blue'
             document.getElementById(animation.bars[1]).style.backgroundColor = 'blue'
            } 
            if(animation.move == 'swap') {
                  const temp = document.getElementById(animation.bars[0].toString()).style.height
                  document.getElementById(animation.bars[0].toString()).style.height = document.getElementById(animation.bars[1].toString()).style.height
                  document.getElementById(animation.bars[1]).style.height = temp
                } 
                if(animation.move == 'uncompare') {
                  document.getElementById(animation.bars[0]).style.backgroundColor = 'crimson'
                  document.getElementById(animation.bars[1]).style.backgroundColor = 'crimson'
                }
           } , i * speed/10 )
       }   
         
     
  }

  useEffect(() => {
       genrate(50)
    }, [])

  return (
    <div className="App">
        <header className="header">
          <div className="options">
            <button className="gen" onClick={sizeHandler} >genrate</button>
            <button className="sort" onClick={sort} >sort</button>
            <input type="range" min="10" max="200"   class="slider" id="sizeRange" onChange={sizeHandler} />
            <p id="size" >50</p>
            <input type="range" min="1" max="1000"  class="slider" id="speedRange" value={speed} onChange={speedHandler} />
            <p  id="size" >{speed}</p>
            </div>
        </header>
        <div className="bars-container" id="bars">
          {bars.map(bar => (
           <Bar data={bar} />
          ))}
        </div>
    </div>
  );
}


export default App;
