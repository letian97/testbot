/**
 * Tap Code Transmitter View controller
 * Author: Moses Wan
 * Date: January 2018
 * This file is the view controller of the Tap Code Transmitter Application.
 *
 * This file is designed to only deal with setting up the view as well as attaching
 * the behaviour to the buttons and other view only interactions.
 *
 * The processing be done in the CodeProcessor class.
 */
let codeProcessor = new CodeProcessor();

/**
 * Used to do everything needed on first load
 */
window.onload = function()
{
  // Sets the value of the progress bar.
  document.querySelector('#p1').addEventListener('mdl-componentupgraded', function() {
    this.MaterialProgress.setProgress(0);
  });
}

/**
 * Used to update the label as the slider changes value.
 * @param  {Number} value   Value on the progress bar
 */
function sliderchange(value)
{
  let label = document.querySelector(".tx-controls > label");
  label.innerText = value + " ms";
}

/**
 * Callback of the Output button to trigger the box flashing and also triggers
 * the translation beforehand as well.
 */
function txOutput()
{
  // Triggers the translation
  let code = txTranslate();

  // Disable all the buttons so users don't do anything silly
  document.querySelectorAll("button").forEach(function(element)
  {
    element.disabled = true;
  });
  document.querySelector("#s1").disabled = true;
  document.querySelector("#tx-text").disabled = true;

  // Triggers the box flashing
  flashOutput(code, code.length);
}

/**
 * Callback from the Translate button.
 * Also triggers the translation process but before it redirects it to the CodeProcessor
 * class, it will remove all bad characters and all whitespace will become spaces.
 * @return {string}   Array of * and spaces that represents the tap code
 */
function txTranslate()
{
  // Preformatting text using regex expression to target non alphabet characters
  let option = document.querySelector("#tx-text").value;
  let text = "";
  let alphabet = 'abcdefghijklmnopqrstuvwxyz';

  if (option === "") {
    let emptyRand = 10 - Math.floor(Math.random() * 3);
    option = "r" + emptyRand;
  }

  if (option[0] === 'r' && Number.isInteger(Number(option[1]))) {
    for (let i=0; i<option[1]; i++) {
      text += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  } else if(Number.isInteger(Number(option))) {
    switch(option) {
      case '1':
        text = "The quick";
        break;
      case '2':
        text = "fox jumps";
        break;
      case '3':
        text = "over the";
        break;
      case '4':
        text = "lazy dog";
        break;
      case '5':
        text = "and knocks";
        break;
    }
  } else {
    text = option;
  }
  text = text.trim();//remove start and end space

  document.querySelector("#tx-text").value = text;

  text = text.toLowerCase().replace(/[^a-z\s]/g, "");
  text = text.toLowerCase().replace(/\s/g, " ");
  document.querySelector("#tx-text").value = text;

  // Redirects it to the CodeProcessor class for conversion.
  let code = codeProcessor.text2Code(text);

  // Updates UI
  document.querySelector("#tx-code").innerText = code;
  return code;
}

function randomGenerateOne() 
{
  console.log("execute");
  document.querySelector("#tx-text").value = "";
  txTranslate();
} 

function randomGenerateMany() 
{

  for(let i = 0; i < 5000; i++) {

    setTimeout(function() {
      if(i%2 == 0) {
        document.getElementById("testbot_title").style.color = "black";      
      } else {
        document.getElementById("testbot_title").style.color = "white";      
      }

      //let color = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4"];

      //document.getElementById("outputArea").style.backgroundColor = color[i%color.length];
      setColor(document.getElementById("outputArea"));
      if (i == 4999) {
        document.getElementById("outputArea").setAttribute("style", "background-color: black;");
      }
          
      randomGenerateOne();
    }, 50);  
  }
  //document.getElementById("testbot_title").innerHTML = "MONASH TEST BOT";
} 


function setColor(element) {
  // Use a colours array to hold colour component values.
  // Store this in a property of the DOM element.
  if (element.colours === undefined)
  {
      element.colours = [128, 128, 128];
  }
  for (let i = 0; i < 3; ++i)
  {
      // Generate a random integer between -4 and +4.
      let difference = (Math.round(Math.random() * 8) - 4);
      
      // Modify the colour component value by this amount. 
      let newColour = element.colours[i] + difference;


      // Make sure colour value is between 0-255
      newColour = Math.min(newColour, 255);
      newColour = Math.max(newColour, 0);
      
      // Update colour component value.
      element.colours[i] = newColour;
  }

  element.setAttribute("style", "background-color: rgb(" + element.colours[0] + ", " + element.colours[1] + ", " + element.colours[2] + ");");
}

/**
 * Controls the flashing of the box that emits the tap code.
 * This function uses recursion and creates new threads to continue the flashing
 * till there is no tap code left to emit.
 * @param  {string} code              Array of * and spaces that represents the
 *                                    tap code to emit.
 * @param  {Number} originalLength    Length of the original tap code array.
 */
function flashOutput(code, originalLength)
{
  // Updates the progress bar
  document.querySelector("#p1").MaterialProgress.setProgress((originalLength-code.length)/originalLength * 100)

  // If there is no more tap code to emit, update the UI to reenable everything.
  if(code == "")
  {
    document.querySelector("#p1").MaterialProgress.setProgress(0);
    document.querySelectorAll("button").forEach(function(element)
    {
      element.disabled = false;
    });
    document.querySelector("#s1").disabled = false;
    document.querySelector("#tx-text").disabled = false;
    return;
  }

  let outputArea = document.getElementById("outputArea");
  let slider = document.getElementById("s1");

  if(code.charAt(0) === "*")
  {
    // If it is an *, flash the box white once after 1 cycle for 1 cycle
    setTimeout(function() {
        outputArea.style.backgroundColor = "white";
    }, slider.value);
    setTimeout(function() {
        outputArea.style.backgroundColor = "black";
        flashOutput(code.slice(1), originalLength);
      }, slider.value*2);
  }
  else
  {
    // If it is a space, don't do anything for 2 cycles (next one will wait 1
    // cycle before flashing white)
    setTimeout(function() {
        flashOutput(code.slice(1), originalLength);
      }, slider.value*2);
  }

}