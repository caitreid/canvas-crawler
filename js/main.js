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
const statusEl = document.getElementById('status')

// we need to set the game's context to be 2D
const ctx = game.getContext('2d')

// we also want to save that context to a variable for reference later
// this is how we tell code to work within the context of the canvas

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])
game.height = 360
game.width = 720



class Ogre {

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


class Hero {
    constructor(x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        // we need additioanl props on our hero class to make movement smoother
        this.speed = 15
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        }

        // set the direction - send our hero flying in that direction
        this.setDirection = function (key) {
            console.log('this is the key in setDirection', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        }
        this.unsetDirection = function (key) {
            console.log('this is the key in unsetDirection', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        }
        // unsets a direction, which stops our hero from moving in that direction

        // new movement handler, so we'll get rid of the old one
        // this will allow us to use the direction property on our hero object
        this.movePlayer = function() {
            // send our guy flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed

                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed

                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed

                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed

                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        }

        this.render = function () {
            ctx.fillStyle = this.color  
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
} 

const getRandomCoordinates = (max) => {
    return Math.floor(Math.random() * max)
}

const player = new Hero(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Ogre(200, 50, 32, 48, '#bada55')
const ogre2 = new Ogre(getRandomCoordinates(game.width), getRandomCoordinates(game.height), 64, 96, 'red')

// player.render()
// ogre.render()


const detectHit = (thing) => {

    // console.log('detect hit')

    if (player.x < thing.x + thing.width
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height 
        && player.y + player.height > thing.y
        ) {
            console.log('hitttt hay')
            thing.alive = false
        }

}

const gameLoop = () => {

    ctx.clearRect(0, 0, game.width, game.height)

    if (ogre.alive) {
        ogre.render()
        detectHit(ogre)
    } else if (ogre2.alive) {
        statusEl.textContent = 'get her!!!'
        ogre2.render()
        detectHit(ogre2)
    } else {
        statusEl.textContent = 'you win!'
        stopGameLoop()
        
    }

    player.render()
    player.movePlayer()
    movement.textContent = `Player position: ${player.x}, ${player.y}`
} 

document.addEventListener('keydown', (e) => {
    // set the appropriate direction when a key is pressed
    player.setDirection(e.key)

})

document.addEventListener('keyup', (e) => {
    // key is released, call on set direction
    if(['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

// set it as a variable
// runs game loop every 60 milliseconds until we tell the game to stop
const gameInterval = setInterval(gameLoop, 60)

const stopGameLoop = () => {
    clearInterval(gameInterval)
}

// add event listener
document.addEventListener('DOMContentLoaded', function () {
    
    gameInterval
})
