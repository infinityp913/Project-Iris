# Project-Iris

An application that translates objects you see in the real world into words in your language. 

# Inspiration
From seeing our own family, peers, and countless others facing the challenge of living in a new country, the language barrier seems to be one of the biggest hurdles into assimilating into a new country someone could face. Inspired by this, we wanted to make something to lighten that burden and thus, project iris was formed.

# What it does
The web app uses your mobile or web camera to identify an object in your surroundings and then translate it to the native language of your choosing. Project Iris enables people to easily identify everyday objects through a simple click of a button in an easy to use interface. This is ideal for people moving to different countries by helping them get accustomed to everyday life in a world with a completely different language.

# How I built it
We wanted an object classification script that recognizes everyday objects to the highest possible accuracy. We started by comparing neural network frameworks for browser or client-side javascript and found TensorFlow.js to be the easiest and fastest to set up. Of the object classification models we found the mobilenet model trained on the imagenet dataset to be the best in terms of recognizing everyday objects like water bottles, lamps and laptops with the highest accuracy with reasonably low image resolution. We finally fine tuned the mobilenetv2 to a dataset of low res mobile phone pictures of everyday objects.

We used the Google Translate API from the Google Cloud Platform for the translation part.

We worked on a server side interface (express js) to implement endpoints for the translation part and a client side to present. Finally we wired all the api’s to get a smooth integration of multiple technologies

# Challenges I ran into
We had some issues with Hosting the server through heroku. We had to research enabling Google Cloud Platform authentication on a remote Heroku server without compromising on the security of the Google Cloud keys.

Being able to successfully access the webcam through html and js proved quite difficult at first but after some perseverance and quite a bit of debugging, we got it to work

Keeping the visual structure of the html components intact through dynamic pages was also quite frustrating but after some css magic and understanding of the inheritance structure, that was also corrected

# Accomplishments that I'm proud of
We’re proud of being able to configure the whole Google Cloud Platform keys and authentication for Google Translate API on local testing env as well as production Heroku env after the many challenges we faced debugging errors with service keys especially because it was our first time trying it out. We’re proud of being able to compare, assess and choose the best datasets, models and frameworks for our neural network deep learning back end. We’re proud of building an eye catchy UI that presents the complicated backend with neural networks and cloud platform api’s elegantly. We’re proud of overcoming our initial hiccups with image transfer over client-server links

# What's next for Project Iris
We are going to complete the text to audio part so that the user can hear the name of the objects in the language their choosing

# Built With
css3
google-cloud
google-translate
heroku
html5
javascript
node.js
tensorflow-js
# Try it out
 desolate-lake-61584.herokuapp.com
