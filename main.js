objects = [];
status = "";
input = "";

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log("Model Loaded");
    status = true;
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            if(objects[i].label == input){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("mentioned_object").innerHTML = "Object mentioned found";
                SpeechSynthesisUtterance("Object mentioned found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("mentioned_object").innerHTML = "Object mentioned found";
            }
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("##FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}