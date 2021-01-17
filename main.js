// const tesseract = import("node-tesseract-ocr");

//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){

  // talkify config stuff
//   talkify.config.remoteService.host = 'https://talkify.net';
//   talkify.config.remoteService.apiKey = '558cecb3-7843-4ad6-b759-993123affadc';
//   talkify.config.ui.audioControls.enabled = true;
  //add an event listener 
  live();
}
console.log('whatever');

function live() {
  const video = document.getElementById('livevid');
  window.navigator.mediaDevices.getUserMedia(constraint)
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();

        w = video.videoWidth;
        h = video.videoHeight

        canvas.width = w;
        canvas.height = h;
        };
    })

    .catch( () => {
        alert('Camera permission required');
    });
}


function snapshot(){
  var canvas = document.createElement('canvas');
  var context = canvas.getContext("2d");
  const video = document.getElementById('livevid');
  context.drawImage(video, 0, 0, w, h);
  var dataURI = canvas.toDataURL('image/jpeg');
  localStorage.setItem("image", dataURI);
}

const constraint = 
    {
        audio: false,
        video: {
            frameRate: { ideal: 10, max: 15 },
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: "environment" }
        }
    }

function startReading(){
  //Get frame from camera feed

  //Analyse frame using tesseract
  // const config = {
  //   lang: "eng",
  //   oem: 1,
  //   psm: 3,
  // }
  // let textData = ""
  // tesseract.recognize("image.jfif", config)
  //   .then(text => {
  //     console.log("Result:", text)
  //     textData = text
  //   })
  //   .catch(error => {
  //     console.log(error.message)
  //     textData = "Sorry I didn't catch that."
  //   })

  //Generate audio based on the text
  const player = new talkify.TtsPlayer()
  .forceVoice({name: "Zira"});
  player.setRate(-1);
  player.playText("Hello world");
  const audio = document.getElementById("talkify-audio");
  audio.classList.add("audio");
  document.getElementById('audio-wrapper').appendChild(audio);
}