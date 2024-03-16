let plrPos = 2 // current car position - initialized as 2, 4 to start in bottom middle
let oldPos = plrPos // old car position - initialized as plrPos
let lanes = [[0, -1], [1, -1], [2, -1], [3, -1], [4, -1]] // lane starting positions
let score = 0 // amount of player points
let lockedScore = 0 // locked amount of player points
let failureScore = 0 // if you fail 10 or more times it gives you a funny little easter egg
let spawn = true // can cars spawn?
let scoreLocked = false // can you earn points?
let doForeverLoop = false // does it do the loop that shows your score?

function varInit(){ // this is for restarting the game
	plrPos = 2
	oldPos = plrPos
	lanes = [[0, -1], [1, -1], [2, -1], [3, -1], [4, -1]]
	score = 0
	lockedScore = 0
	failureScore = 0
	spawn = true
	scoreLocked = false
	doForeverLoop = false
}

function plrMove() {
    led.plot(plrPos, 4) // turns on the led at the starting position, bottom middle (2,4)
    input.onButtonPressed(Button.A, function () {
		if (plrPos > 0) { // only works if the player isn't at the far left side
			led.plot(plrPos, 4) // turns on the led at the player position
			plrPos += -1 // decreases plrPos by 1
			led.unplot(oldPos, 4) // turns off the led at the old player position
            oldPos = plrPos // sets oldPos to plrPos (current car position)
        }
    })
    input.onButtonPressed(Button.B, function () {
        if (plrPos < 4) { // only works if the player isn't at the far right side
            led.plot(plrPos, 4) // turns on the led at the player position
            plrPos += 1 // increases plrPos by 1
            led.unplot(oldPos, 4) // turns off the led at the old player position
            oldPos = plrPos // sets oldPos to plrPos (current car position)
        }
    })
}

input.onButtonPressed(Button.AB, function() {
	basic.clearScreen()
	varInit()
})

loops.everyInterval(500, function () {
	plrMove() // calls the carMove function
})

function carMove(){
	if(spawn == true){ // cars can spawn while this is true
		let selectedLane = randint(0, 4) // gets you a random number between 0 and 4
		for(let j = 0; j < lanes.length; ){
			for (let i = 0; i < 6; ) {
				if (!led.point(lanes[selectedLane][0], lanes[selectedLane][1])) { // only runs if led is off
					led.plot(lanes[selectedLane][0], lanes[selectedLane][1]) // turns on car led
					pause(1000) // waits 1 second
					led.unplot(lanes[selectedLane][0], lanes[selectedLane][1]) // turns off car led
					lanes[selectedLane][1] += 1 // increases the car position by 1 and repeat
					if(scoreLocked == false){ // only increases the score during the game.
						score += 1 // increases the score by 1
					}
				}else{
					if (failureScore >= 10) {
						basic.forever(function () {
							doForeverLoop = false
							basic.clearScreen()
							basic.showString("YOU BAD. 10 FAILS")
						})
					}else{
						lockedScore = score / 5 // sets the locked score to the score divided by 5
						endGame() // triggers the endGame function. if this function gets called your a bad driver
					}
				}
			}
		}
	}
}

function endGame() {
	plrPos = -2 // sets to -2 because of confusions with lane spawn system
	oldPos = -2 // same reason as above
	spawn = false // don't worry, cars won't spawn on you
	doForeverLoop = true
	failureScore += 1
	basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
    `)
	pause(200)
	while(doForeverLoop == true) {
		basic.clearScreen() // clears the screen
		basic.showNumber(lockedScore) // displays the locked score
	}
}

basic.forever(function() {
    carMove() // calls the carMove function
})
