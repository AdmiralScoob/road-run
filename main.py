def endGame():
    global carPos, oldPos, spawn, canCollide
    carPos = [-2, -2]
    oldPos = [-2, -2]
    spawn = False
    canCollide = True
    basic.show_leds("""
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        """)
    pause(200)
    
    def on_forever():
        basic.show_number(score)
    basic.forever(on_forever)
    
def carMovement():
    led.plot(carPos[0], carPos[1])
    
    def on_button_pressed_a():
        if carPos[0] > 0:
            led.plot(carPos[0], carPos[1])
            carPos[0] -= 1
            led.unplot(oldPos[0], oldPos[1])
            oldPos[0] = carPos[0]
    input.on_button_pressed(Button.A, on_button_pressed_a)
    
    
    def on_button_pressed_b():
        if carPos[0] < 4:
            led.plot(carPos[0], carPos[1])
            carPos[0] += 1
            led.unplot(oldPos[0], oldPos[1])
            oldPos[0] = carPos[0]
    input.on_button_pressed(Button.B, on_button_pressed_b)
    
canCollide = False
spawn = False
oldPos: List[number] = []
carPos: List[number] = []
score = 0
carPos = [2, 4]
# Current car position - initialized as 2, 4 to start in bottom middle
oldPos = [carPos[0], carPos[1]]
# Old car position - initialized as carPos
lanes = [[0, -1], [1, -1], [2, -1], [3, -1], [4, -1]]
spawn = True
for i in range(4):
    selectedLane = i
    if spawn and not (led.point(lanes[selectedLane][0], lanes[selectedLane][1])):
        led.plot(lanes[selectedLane][0], lanes[selectedLane][1])
        pause(1000)
        led.unplot(lanes[selectedLane][0], lanes[selectedLane][1])
        lanes[selectedLane][1] += 1
    elif not (canCollide):
        endGame()

def on_every_interval():
    carMovement()
loops.every_interval(200, on_every_interval)
