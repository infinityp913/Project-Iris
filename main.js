// const tesseract = import("node-tesseract-ocr");

//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){
  live();
  document.getElementById('button-card').addEventListener('click', async ()=>{
    classify(snapshot());
    // classify(document.getElementById('bottle'))
  })
  translate_req();
}
let w = 0;
let h = 0;

function live() {
  const video = document.getElementById('livevid');
  window.navigator.mediaDevices.getUserMedia(constraint)
  .then(stream => {
    video.srcObject = stream;
    video.onloadedmetadata = (e) => {
        video.play();

        w = video.videoWidth;
        h = video.videoHeight

        // canvas.width = w;
        // canvas.height = h;
        };
    })

    .catch( () => {
        alert('Camera permission required');
    });
}


function snapshot(){
  const canvas = document.createElement('canvas');
  const context = canvas.getContext("2d");
  const video = document.getElementById('livevid');
  canvas.width = w;
  canvas.height = h;
  context.drawImage(video, 0, 0, w, h);
  // const dataURI = canvas.toDataURL('image/jpeg');
  // const temp_img = document.createElement('img'); //DEBUG code
  // temp_img.src = dataURI;
  // document.getElementsByTagName('body')[0].prepend(temp_img);
  return canvas;
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


async function classify(img){
  // const img = document.getElementById('canvas'); 

  const model = await mobilenet.load();
  const predictions = await model.classify(img);

  const pred = predictions.reduce((acc, val) => {
    acc = acc.probability > val.probability ? acc : val;
    return acc;
  }, {className: "", probability: -1});
  console.log('list of predictions: '+JSON.stringify(predictions));
  console.log('pred: '+(JSON.stringify(pred)));
  console.log(`Prediction: ${pred.className}`);
  document.getElementById('output-card').innerHTML = `Your object: ${pred.className}`;
}

async function translate_req(){
  const response = await fetch('/translate', {
      method: 'POST',
          headers: {
              'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
              text: 'I speak Chinese',
              lang: 'zh'
          })
  });
  if (!response.ok) {
      console.log(response.error);
      return;
  }
  else{
    const translation = await response.text();
      console.log(translation);
  }
}