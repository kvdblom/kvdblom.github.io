// Helper function for a nicer random values
function random(min, max)
{
    return Math.random() * (max - min) + min;
}

// Get random or default colour based on probability
function getProbColour(prob, edge)
{
    let def_col = 'ivory'

    if(edge == true)
    {
        def_col = 'gainsboro'
    }

    if(random(0,1) < prob)
    {
        var colour = Color.random()
    }
    else
    {
        var colour = 'ivory'
    }

    return colour;
}

// Provide probabilities for the top, bottom, and edge to be coloured
function generateHex(p_bot, p_top, p_edge)
{
    // Create a Paper.js Path to draw a line into it:
    var hexagon = new Path({closed: true});
    // Color our path black
    hexagon.strokeColor = getProbColour(p_edge, true)//Color.random()//'violet';
    hexagon.strokeWidth = 18
    
    // How many points do we want our object to have
    var points = 6;
    // How large should it be
    var radius = 200;
    // 0 to 2PI is a circle, so divide that by the number of points
    // in our object and that's how many radians we should put a new
    // point in order to draw the shape
    var angle = ((2 * Math.PI) / points);

    // For as many vertices in the shape, add a point
    for(i = 0; i <= points; i++)
    {
        // Add a new point to the object
        hexagon.add(new Point(
            // Radius * Math.cos(number of radians of the point) is the x position
            radius * Math.cos(angle * i), 
            // And the same thing with Math.sin for the y position of the point
            radius * Math.sin(angle * i)
        ));
    }
    
    topHalf = new Path({closed: true});
    
    for(i = 3; i <= points; i++)
    {
        topHalf.add(new Point(
            radius * Math.cos(angle * i),
            radius * Math.sin(angle * i)
        ));
    }

    let fillTop = getProbColour(p_top, false)
    fillTop.lightness = random(0.6,1)
    topHalf.fillColor = fillTop//"turquoise";
    topHalf.position.x += 200;
    topHalf.position.y += 200;
    
    botHalf = new Path({closed: true});
    
    for(i = 0; i <= 3; i++)
    {
        botHalf.add(new Point(
            radius * Math.cos(angle * i),
            radius * Math.sin(angle * i)
        ));
    }
    
    let fillBot = getProbColour(p_bot, false)
    fillBot.lightness = random(0.6,1)
    botHalf.fillColor = fillBot//"pink";
    botHalf.position.x += 200;
    botHalf.position.y += 200;

    // Offset the shape so it's fully displayed on the canvas
    hexagon.position.x += 200;
    hexagon.position.y += 200;
    //hexagon.position = view.bounds.center
    //.fillColor = "pink";
    let hexa = new Group([hexagon, topHalf, botHalf])
    
    return hexa
}

// Set colour probabilities

// Random colours
let p_top_base = 1
let p_bot_base = 1
let p_edg_base = 1

// Probabilistic colours
let mode = 'prob'

if(mode == 'prob')
{
    p_top_base = 0.1
    p_bot_base = 0.01
    p_edg_base = 0
}

// Make a grid of hexagons
for(let x = 0; x<10; x++)
{
    for(let y = 0; y<10; y++)
    {
        p_top = y*p_top_base
        p_bot = y*p_bot_base

        if(y % 2 == 0)
        {
            generateHex(p_top, p_bot, p_edg_base).position = new Point(x*636, y*182)
        }
        else
        {
            generateHex(p_top, p_bot, p_edg_base).position = new Point(318+(x*636), y*182)
        }
    }
}

// Zoom out a bit for a better view
view.scale(0.3, view.bounds.topLeft)
