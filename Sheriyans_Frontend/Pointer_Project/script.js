console.log("Js file Running");
const mouseFollower = document.querySelector(".mouse-follower");

let x = 0, y = 0;


document.addEventListener("pointermove",(e)=>{
    const { clientX, clientY } = e;
    

    x = clientX;
    y = clientY;
    console.log(x,y);

    // Rendering and painting time increase by using top and left --> Here full website Re-caluculte .painting when element move using top,left
    mouseFollower.style.top = y + "px";
    mouseFollower.style.left = x + "px";

    // Optimize here only change part rendering and painiting (selected element)
    // mouseFollower.style.transform = `translate(${clientX}px,${clientY}px)`

    // far();
})

function far(){

    // mouseFollower.style.transform = `translate(${x}px,${y}px)`;
    console.log("Hello");
    requestAnimationFrame(far);
    // Every browser has FPS , frame per second some browser goes up in some scenarion. (max to max 60FPX)
    // Due to some performance issue they drop of FPS that frame to show the user for pixel they do the calculation
    // Based on the canvas there pixel depends. In One Frame suppose 1lakh pixel there for 60FPS 60lakh , caluculation to paint the pixel.
    // When 1 frame calculate before that requestAnimationFrame call it. 
}

// far();