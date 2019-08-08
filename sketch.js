let doors = [];
let pickedDoors = [0, 0, 0];
let pickedDoor;
let choise;
let selected = false;
let currentDoor;

function setup() {
    createCanvas(600, 400);
    textSize(50);
    textAlign(CENTER);
    text('Pick a square', width / 2, 300);
    rect(0, 0, width - 1, height - 1 - 202);
    text('1', 100, 80);
    line(width / 3, 0, width / 3, height - 203);
    text('2', width / 3 + 100, 80);
    line(width * 2 / 3, 0, width * 2 / 3, height - 203);
    text('3', width * 2 / 3 + 100, 80);
    doors = randomPrice(doors);
}

async function draw() {
    if (pickedDoor != undefined && !selected) {
        pickedDoors[pickedDoor] = 1;
        strokeWeight(5);
        fill(100, 255, 0);
        ellipse(pickedDoor * width / 3 + 100, 140, 50);
        doors[pickedDoor] = 2;
        noLoop();
        const loosingDoor = openLoosingDoor(doors);
        noStroke();
        fill(255);
        rect(0, height / 2, width, height);
        fill(0);
        text('Revealing another door...', width / 2, 300);
        await new Promise(res => setTimeout(res, 2000));
        fill(255, 0, 0);
        text('Nothing', loosingDoor * width / 3 + 100, 160);
        pickedDoors[loosingDoor] = 1;
        noStroke();
        fill(255);
        rect(0, height / 2, width, height);
        fill(0);
        text('Change square?', width / 2, 300);
        selected = true;
        currentDoor = pickedDoor;
        loop();
    }
    
    if (mouseIsPressed && selected) {
        if (pickedDoor == currentDoor && doors.includes(1)) {
            fill(255);
            rect(pickedDoor * width / 3 + 10, 100, 140, 70);
            fill(255, 0, 0);
            text('Nothing', pickedDoor * width / 3 + 100, 160);
            noStroke();
            fill(255);
            rect(0, height / 2, width, height);
            fill(0);
            text('You lose', width / 2, 300);
        } else if (pickedDoor == currentDoor && !doors.includes(1)) {
            fill(255);
            rect(currentDoor * width / 3 + 10, 100, 140, 70);
            fill(0, 255, 0);
            text('Price', currentDoor * width / 3 + 100, 160);
            last = lastDoor(pickedDoors);
            fill(255);
            rect(last * width / 3 + 10, 100, 140, 70);
            fill(255, 0, 0);
            text('Nothing', last * width / 3 + 100, 160);
            noStroke();
            fill(255);
            rect(0, height / 2, width, height);
            fill(0);
            text('You win', width / 2, 300);
            noLoop();
        } else if (pickedDoor != currentDoor && doors.includes(1)) {
            fill(255);
            rect(currentDoor * width / 3 + 10, 100, 140, 70);
            fill(255, 0, 0);
            text('Nothing', currentDoor * width / 3 + 100, 160);
            last = lastDoor(pickedDoors);
            fill(255);
            rect(last * width / 3 + 10, 100, 140, 70);
            fill(0, 255, 0);
            text('Price', last * width / 3 + 100, 160);
            noStroke();
            fill(255);
            rect(0, height / 2, width, height);
            fill(0);
            text('You win', width / 2, 300);
            noLoop();
        } else if (pickedDoor != currentDoor && !doors.includes(1)) {
            fill(255);
            rect(currentDoor * width / 3 + 10, 100, 140, 70);
            fill(0, 255, 0);
            text('Price', currentDoor * width / 3 + 100, 160);
            fill(255);
            rect(pickedDoor * width / 3 + 10, 100, 140, 70);
            fill(255, 0, 0);
            text('Nothing', pickedDoor * width / 3 + 100, 160);
            noStroke();
            fill(255);
            rect(0, height / 2, width, height);
            fill(0);
            text('You lose', width / 2, 300);
        }
        noLoop();
    }
}

function randomPrice(doors) {
    let winnerDoor = floor(random(0, 3));
    doors[winnerDoor] = 1;
    for (let i = 0; i < 3; i++) {
        if (doors[i] != 1) doors[i] = 0;
    }
    return doors;
}

function openLoosingDoor(doors) {
    for (let i = 0; i < 3; i++) {
        if (doors[i] != 2 && doors[i] == 0) {
            doors[i] = 3;
            return i;
        }
    }
}

function mousePressed() {
    if (mouseX < width / 3)
        pickedDoor = 0;
    else if (mouseX >= width / 3 && mouseX < width * 2 / 3)
        pickedDoor = 1;
    else
        pickedDoor = 2;
}

function lastDoor(doors) {
    for(let i = 0; i < 3; i ++) {
        if(doors[i] == 0) return i;
    }
}