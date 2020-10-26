const grids = document.querySelectorAll(".grid");
const headings = document.querySelectorAll(".heading .wrapper .text");
const fondo = document.querySelector("#fondo");

function enterScreen(index){
    const grid = grids[index];
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll(".column");

    grid.classList.add("active");

    gridColumns.forEach(element => {
        element.classList.remove("animate-before", "animate-after");
    });

    heading.classList.remove("animate-before", "animate-after");
};

function exitScreen(index, exitDelay){
    const grid = grids[index];
    const heading = headings[index];
    const gridColumns = grid.querySelectorAll(".column");

    gridColumns.forEach(element => {
        element.classList.add("animate-after");
    });

    heading.classList.add("animate-after");

    setTimeout(() => {
        grid.classList.remove("active");
    }, exitDelay)
};

function setupAnimationCycle({timePerScreen, exitDelay}){
    const cycleTime = timePerScreen + exitDelay;
    let nextIndex = 0;

    console.log(nextIndex);

    function nextCycle(){
        const currentIndex = nextIndex;

        enterScreen(currentIndex);

        setTimeout(() => {
            exitScreen(currentIndex, exitDelay);
        }, timePerScreen)
        
        nextIndex = nextIndex >= grids.length - 1 ? 0 : nextIndex + 1;
    }

    //enterScreen(0);
    nextCycle();
    setInterval(nextCycle, cycleTime);
};

setupAnimationCycle({
    timePerScreen: 3500,
    exitDelay: 200 * 7
});

window.onscroll = function(){
    y = window.scrollY;
    if(window.scrollY >= 318){
        fondo.classList.add("fondo");
       //document.querySelector(".grid-container").style.filter = "brightness(0.3)";
    }else{
        //document.querySelector(".grid-container").style.filter = "none";
        fondo.classList.remove("fondo");
    }
};

document.querySelector("#btn").addEventListener("click", e => {
    window.scroll({
        top: 850,
        left: 0,
        behavior: "smooth"
    });
    e.preventDefault();
});

