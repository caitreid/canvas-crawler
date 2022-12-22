// requirements, goals
// make a simple crawler game using canvas that we manipulate in JS

// we need two entities: hero + and ogre
// hero should move with the WASD or ARROW keys (display hero coords)
// the ogre will be stationary
// hero and the ogre should be able to collide to make something happen
// when the hero collides with the ogre, ogre is removed from the screen, the game stops +
// sends a message to the user that they have won

// first we grab our HTML elements for easy reference later

const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const status = document.getElementById('status')

// we need to set the game's context to be 2D
const ctx = game.getContext('2d')

// we also want to save that context to a variable for reference later
// this is how we tell code to work within the context of the canvas

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360


console.log('game after setting width and height')
console.log(game)

// const hero = {
//     x:10,
//     y:10,
//     color: 'yellow',
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// const ogre = {
//     x: 200,
//     y:100,
//     color: "green",
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function() {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// hero.render()
// ogre.render()


class Crawler {
    // allows properties on the class to change object by object
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.render = function () {
            ctx.fillStyle = this.color  
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
} 

const player = new Crawler(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Crawler(200, 50, 32, 48, '#bada55')

player.render()
ogre.render()


// how and when to move the player around
const movementHandler = (e) => {

    // e is standing for event
    // basic key codes
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, left = 37, down = 40, right = 39
    console.log('keycode is: ', e.keyCode)

    switch (e.keyCode) {
        case (38):
        case (87): 
            player.y -= 10

            break
        
        case (37):
        case (65): 
            player.x -= 10
            break
        
        case (40):
        case (83): 
            player.y += 10
            break
        
        case (39):
        case (68): 
            player.x += 10
            break
        
    }
}

const gameLoop = () => {
    // no console.logs in here
    // testing logs are ok, none in real thing
    
    // to resemble movement, we should clear the old canvas every loop
    // to avoid snake trails, we'll just see our player square moving around
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    movement.textContent = `${player.x}, ${player.y}`

    if (ogre.alive) {
        ogre.render()
    }
} 

// add event listener
document.addEventListener('DOMContentLoaded', function () {
    // game loop interval
    setInterval(gameLoop, 60)
    
    document.addEventListener('keydown', movementHandler)

    setInterval(gameLoop, 60)
})
