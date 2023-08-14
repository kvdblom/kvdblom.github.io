//helping function for a nicer random value
function random(min, max) {
    return Math.random() * (max - min) + min;
}

function generateCat(){
    //Let's make a Cat!
    //first part: creating all face parts.
    //all parts are primitive geometric shapes like rectangles, cirles, etc
    let face = new Path.Rectangle(new Point(0,0),new Size(450,270))
    face.position = view.bounds.center
    let tabbar = new Path.Rectangle(face.bounds.topLeft, new Size(face.bounds.width, 50))
    let eye1 = new Path.Circle(tabbar.bounds.bottomLeft + [80,80], 35)
    eye1.name = "eye1"
    let eye2 = new Path.Circle(tabbar.bounds.bottomRight + [-80,80], 35)
    let nose = new Path.Line(face.position + [-15,tabbar.bounds.height/2], face.position + [15,tabbar.bounds.height/2])
    let ear1 = new Path([
            [0, -30],
            [90, -120],
            [180, -30],
        ])
    ear1.bounds.bottomLeft = face.bounds.topLeft - [0,25]
    let ear2 = ear1.clone()
    ear2.bounds.bottomRight.x = face.bounds.topRight.x
    let mouth = new Path.Arc([0,0], [35,35], [70,0])
    mouth.arcTo([105,35], [140,0])
    mouth.bounds.topCenter = nose.position + [0,30]
    let shadow = new Path(face.bounds.bottomLeft+[20,0], face.bounds.bottomRight, face.bounds.topRight+[0,20])
    
    //all face parts are grouped together into a group called 'cat'
    let cat = new Group([shadow, face, tabbar, eye1, eye2, nose, ear1, ear2, mouth, nose])
    //all faceparts are filled white and get a thick, red outline
    cat.children.forEach(obj => {
        obj.fillColor = 'white'
        obj.strokeColor = 'red'
        obj.strokeWidth = 9
    })
    //make the shadowline is extra thick
    shadow.strokeWidth *= 6
    


    //Let's make it GENERATIVE! \o/
    
    //blink the eyes
    //with a 50:50 chance, shrink the y-axis of eye1 to 0.1
    if(random(0,1)<0.5){
        eye1.scale(1,0.1)    
    }
    //same for eye 2
    if(random(0,1)<0.5){
        eye2.scale(1,0.1)    
    }
    
    //wide smile
    //stretch the mouth's x-axis randomly between 100% and 200%
    mouth.scale(random(1,2),1)
    
    //set tabbar height to random stretch between 50% and 150%
    //tabbar.bounds.topCenter will keep the tabbar top center point the same
    //so the bar is always at the top of the face
    tabbar.scale(1, random(0.5, 1.5), tabbar.bounds.topCenter)
    
    //random ear sizes
    //first gat random shrink factor between 50% and 100%
    let earSize = random(0.5,1)
    //apply shrinking to both ears and make sure that the outer point of the ears
    //stays the same
    ear1.scale(earSize, ear1.bounds.bottomLeft)
    ear2.scale(earSize, ear2.bounds.bottomRight)
    
    //random color
    //we get a random color for filling, stroke and eye
    //but be set the lightness value in a way that the filling
    //gets lighter colors as the strokes. this way we always
    //have a nice contrast.
    let fill = Color.random()
    fill.lightness = random(0.6,1)
    let stroke = Color.random()
    stroke.lightness = random(0,0.6)
    cat.fillColor = fill
    cat.strokeColor = stroke
    let eyeColor = Color.random()
    eyeColor.lightness = 0.5
    eye2.fillColor = eyeColor
    eye1.fillColor = eyeColor
    return cat
}

//here we make a grid of 10x10 cats
for(let x = 0; x<10; x++){
    for(let y = 0; y<10; y++){
        generateCat().position = new Point(x*500, y*420)
    }
}
//zooming a bit out for a better view
view.scale(0.3, view.bounds.topLeft)
