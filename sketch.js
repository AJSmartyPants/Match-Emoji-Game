// Special credit goes to: The Coding Train / Daniel Shiffman
var picbutton;
var nextlev;
var title;
var instr;
var instr1;
var instr2;
var percent;
var resultres;
// Make the video
let video;
//Make the random emoji appear
let emojis = ["😁", "😢", "😱", "😐", "😁", "😢", "😱", "😐"];
var emoji;
// For displaying the label
let label = "Waiting...";
// The classifier
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/RtgK3C3Y_/';

// STEP 1: Load the model using the ML5 library!
function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  
  //background
  bgimg = loadImage('hackathonbgo.jpg');
  
  title = "Welcome to the Match the Emoji Game!";
  instr = "Try to match the emoji that pops up on your screen!";
  instr1 = "Then press the button to take a picture.";
  instr2 = "Let's see how close you can get! (99% is max)";
}


function setup() {
  createCanvas(windowWidth, windowHeight*1.5);
  // Create the video
  video = createCapture(VIDEO);
  video.hide();
  
  emoji = random(emojis);
  
  //Make and style the picture taking button
  picbutton = createButton("Take a Picture");
  picbutton.position(0, height/1.5);
  picbutton.size(width/3, height/10);
  picbutton.style('background-color: #6bffff');
  picbutton.style('color: #9900ff');
  picbutton.style('font-family: Cookie');
  picbutton.style('text-shadow: 1px 1px 1px');
  picbutton.style('font-size: 45px');
  picbutton.style('border-radius: 10px');
  
  nextlev = createButton("Next Emoji");
  nextlev.position(width-120, height/1.5);
  nextlev.size(width/3, height/10);
  nextlev.style('background-color: #5400e6');
  nextlev.style('color: #beff19');
  nextlev.style('font-family: Cookie');
  nextlev.style('text-shadow: 1px 1px 1px');
  nextlev.style('font-size: 100px');
  nextlev.style('border-radius: 10px');
  
  //tut.play();
  
  //textCo('color: #00ff04');
  //textStyle('text-shadow: 1px 1px 1px');

}

function draw() {
  background("black");
  image(video,0,height/3.3, width, width);
  filter(GRAY);
  //Program our button to "take a picture" and start analyzing when clicked
  picbutton.mousePressed(
    classifyVideo
  );
  nextlev.mousePressed(
    nextemoji
  );
  
  //nextlev.mousePressed(speak);
  
  // STEP 4: Draw the label
  textSize(width/20);
  textAlign(CENTER, CENTER);
  textFont('Passero One');
  fill('#ffff61');
  text(label, width / 2, height - height/1.3);
  
  textSize(width/15);
  textFont('Montserrat Alternates')
  fill('#00ff04');
  text(title, width/2.1, height/20);
  fill('#FF9700');
  textSize((width*height)/21000);
  text(instr, width/2.1, height/10);
  text(instr1, width/2.1, height/8);
  text(instr2, width/2.1, height/6.5);

  textSize(width/5);
  text(emoji, width/2, height/2);

}

// STEP 2 classify the videeo!
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification!
function gotResults(error, results) {
  // In case something went wrong!
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again!
  //label = results[0].label + " " + (Math.round(results[0].confidence*100) -1) + "% sure";
  percent = (Math.round(results[0].confidence*100) -1)
  resultres = results[0].label
  
  if (emoji == "😁") {
    if (resultres == "Happy") {
        if (percent <= 50) {
          label = "Uh oh! You only got " + percent + "% accuracy...";
        } else{
          label = "Great job! You got " + percent + "% accuracy!";
        }
      } else {
        label = "Um, for some reason you look " + percent + "% " + resultres + "...";
      }
  } else if (emoji == "😢") {
    if (resultres == "Sad") {
          if (percent <= 50) {
            label = "Uh oh! You only got " + percent + "% accuracy...";
          } else{
            label = "Great job! You got " + percent + "% accuracy!";
          }
        } else {
          label = "Um, for some reason you look " + percent + "% " + resultres + "...";
        }
  } else if (emoji == "😱") {
    if (resultres == "Surprised") {
          if (percent <= 50) {
            label = "Uh oh! You only got " + percent + "% accuracy...";
          } else{
            label = "Great job! You got " + percent + "% accuracy!";
          }
        } else {
          label = "Um, for some reason you look " + percent + "% " + resultres + "...";
        }
  } else if (emoji == "😐") {
    if (resultres == "Neutral") {
          if (percent <= 50) {
            label = "Uh oh! You only got " + percent + "% accuracy...";
          } else{
            label = "Great job! You got " + percent + "% accuracy!";
          }
        } else {
          label = "Um, for some reason you look " + percent + "% " + resultres + "...";
        }
  }
  
  //classifyVideo();
}

function nextemoji(){
  emoji = random(emojis);
  label = "Waiting..."
}
