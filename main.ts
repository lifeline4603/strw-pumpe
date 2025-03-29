let eDebug = 0
let sFeucht = 0
let pStatus = 0
let lLEDBlinkt = 0
input.onButtonPressed(Button.A, function () {
    eDebug = 1
    basic.showString("" + (sFeucht))
    basic.pause(2000)
    basic.showString("" + (pStatus))
    basic.pause(2000)
    basic.showString("" + (lLEDBlinkt))
    basic.pause(2000)
    basic.clearScreen()
    eDebug = 0
})
basic.forever(function () {
    // Sensor
    if (pins.analogReadPin(AnalogPin.P0) < 200) {
        sFeucht = 1
        if (eDebug == 0) {
            basic.showLeds(`
                . . # . .
                . . # . .
                . . # . .
                . . . . .
                . . # . .
                `)
        }
    } else {
        sFeucht = 0
        if (eDebug == 0) {
            basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
        }
    }
})
basic.forever(function () {
    if (sFeucht == 1) {
        pStatus = 1
    } else {
        pStatus = 0
    }
})
basic.forever(function () {
    if (lLEDBlinkt == 1) {
        pins.digitalWritePin(DigitalPin.P12, 1)
        // on off
        basic.pause(500)
        pins.digitalWritePin(DigitalPin.P12, 0)
        // on off
        basic.pause(500)
    }
})
basic.forever(function () {
    if (pStatus == 1) {
        lLEDBlinkt = 1
        // Pumpe
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else {
        lLEDBlinkt = 0
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
})
