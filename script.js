const pianoKeys = document.querySelectorAll(".piano-keys .key"),
//getting volume slider
 volumeSlider = document.querySelector(".volume-slider input"),
 //getting keys checkbox
 keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
// audio - by default, audio src is "a.waw"
audio = new Audio("./sounds/a.wav");
audio.volume = 0.5;

const playSound = (key) => {
    //passing audio src based on key pressed
    audio.src = `./sounds/${key}.wav`; 
    const sound = audio.play();
    if(sound !== undefined){
        sound.then(_=>{  
        // Automatic playback started!
       // Show playing UI.
        })
        .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
          });
    }
    //getting current clicked key element
    const currentKey = document.querySelector(`[data-key="${key}"]`);
    //adding "active" class to the current clicked key element
    currentKey.classList.add("active");
    //removing "active" class after 100ms from the clicked key element
    setTimeout(()=>{
        currentKey.classList.remove("active");
    },150);
};

pianoKeys.forEach(key => {
    //adding data-key value to the allKeys array
    allKeys.push(key.dataset.key);
    // calling playSound function with passing data-key value as en argument
    key.addEventListener("click",() => playSound(key.dataset.key));
});


// function for volume slider input listener
const handleVolume = (e) => {
    // To set audio volume, valu must be between 0 to 1.
    //0 is 0% , 0.5 is 50%, 1 is 100% 
    //passing the range slider value as an audio value
    audio.volume = e.target.value;
    let percent = (e.target.value / e.target.max) * 100;
    volumeSlider.style.background = `linear-gradient(to right, #fff ${percent}%, #4B4B4B ${percent}%)`;
};

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (k) =>{

    //if the passed key is in the allKeys array, only call the playSound function
    if(allKeys.includes(k.key)) playSound(k.key);
};


keysCheckbox.addEventListener("click", showHideKeys);

volumeSlider.addEventListener("input", handleVolume);

document.addEventListener("keydown", pressedKey);


