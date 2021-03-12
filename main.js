const lang_codes = {
  'English' : 'en',
  'Spanish' : 'es',
  'French' : 'fr',
  'German' : 'de',
  'Dutch' : 'nl'
}

//Add event listener after the window has been loaded
window.onload = loaded;

//function to call when the window has been loaded
function loaded(){
  live();
  document.getElementById('button-card').addEventListener('click', async ()=>{
    const input = await classify(snapshot())
    console.log('label: '+input);
    translate_req(input);
    // classify(document.getElementById('bottle'))
  })
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
          h = video.videoHeight;
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
  return canvas;
}

const constraint = 
    {
        audio: false,
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: { ideal: "environment" }
        }
    }


async function classify(img){
  // const img = document.getElementById('canvas'); 

  const model = await mobilenet.load(version=2);
  const predictions = await model.classify(img);

  const pred = predictions.reduce((acc, val) => {
    acc = acc.probability > val.probability ? acc : val;
    return acc;
  }, {className: "", probability: -1});
  console.log('list of predictions: '+JSON.stringify(predictions));
  console.log('pred: '+(JSON.stringify(pred)));
  console.log(`Prediction: ${pred.className}`);
  return pred.className
  // document.getElementById('output-card').innerHTML = `Your object: ${pred.className}`;
}

async function translate_req(input){
  const response = await fetch('/translate', {
      method: 'POST',
          headers: {
              'Content-Type': 'text/plain'
          },
          body: JSON.stringify({
              text: input,
              lang: lang_codes[document.getElementById('dropdown-card').value]
          })
  });
  if (!response.ok) {
      console.log(response.error);
      return;
  }
  else{
    const translation = await response.text();
    console.log(translation);
    document.getElementById('output-card').innerHTML = `Your object: ${translation.slice(1,-1)}`;
  }
}