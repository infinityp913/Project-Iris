// const tesseract = import("node-tesseract-ocr");

//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){
  live();
  // translate_req();
  classify();
}

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


async function classify(){
  const img = document.getElementById('cat'); // THIS WON'T WORK SINCE THE HTML IS COMMENTED OUT

  const model = await mobilenet.load();
  const predictions = await model.classify(img);

  const pred = predictions.reduce((acc, val) => {
    acc = acc.probability > val.probability ? acc : val;
    return acc;
  }, {className: "", probability: -1});
  console.log(`Prediction: ${pred.className}`);
}

async function translate_req(){
  const response = await fetch('/translate', {
      method: 'POST',
          headers: {
              'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
              text: 'I speak Dutch',
              lang: 'nl'
          })
  });
  if (!response.ok) {
      console.log(response.error);
      return;
  }
  else{
      console.log(response);
  }
}