
var canavs;
var database;

var drawing = []

function setup() {
    canvas = createCanvas(1200, 800);
    //canvas.parent('canvascontainer');
    database = firebase.database()
    background(51)
    camera.position.x = mouseX;
    camera.position.y = mouseY;
 
    clear = createButton('clear')


}

var db_drawing = []

function mouseDragged() {

    var point = {
        x: mouseX,
        y: mouseY
    }
    drawing.push(point);
    var drawingRef = database.ref('drawing')
    drawingRef.set({
        "d": drawing
    })
}

function draw() {
    readData()
    beginShape();
    stroke(255);
    strokeWeight(4);
    noFill();
    for (var i = 0; i < db_drawing.length; i++) {
        vertex(db_drawing[i].x, db_drawing[i].y);
        endShape();
    }
    clear.position(100,100)

    clear.mousePressed(()=>{
        clearDrawing();
        
    })

}

function readData() {
    database.ref('drawing/').on('value', (data) => {
        db_drawing = data.val().d
    })
}

function clearDrawing() {
    db_drawing = [];
    var adaRef = database.ref('drawing');
    adaRef.remove()
}
