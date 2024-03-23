let attackRate = 100
let X_position = 400
let Y_position = 400
let direction = "up"
let Speed = 15
let Score = 0
let enemyX = 800
let enemyXbottom = enemyX + 50
let enemyY = 400
let enemyYright = enemyY + 50
let enemySpeed = 1
let losing = false
let bladeHitbox_X = 0
let bladeHitbox_Y = 0
let health = 5
let scoreNeed = 5

function setup() {
    if (losing) {
        health = 5
        attackRate = 100
        X_position = 400
        Y_position = 400
        direction = "up"
        Speed = 15
        Score = 0
        enemyX = 800
        enemyY = 400
        enemySpeed = 1
        losing = false
        const el = document.getElementById("restart")
        const el2 = document.getElementById("restartGuide")
        el.style.backgroundColor = "transparent"
        el.style.borderColor = "transparent"
        el.style.webkitTextFillColor = "transparent"
        el2.style.webkitTextFillColor = "transparent"
    }
}

function gameTick() {
    attackRate = attackRate - 1
    if (!losing) {
        keypressDetection()
        moveSword(direction)
        moveX()
        moveY()

        enemyMovement()
        enemyMovementChoise()
        enemyPlayerCollision()
        bladeEnemyCollision()

        setValue()

        hitboxes()
        enemyYright = enemyY + 50
        enemyXbottom = enemyX + 50

        border()
        setPionter()
        setHealth()

        if (attackRate < -9999) {
            attackRate = -9999
        }

        let phase = 0
        if (Score > scoreNeed) {
            phase = phase + 1
            newPhase()
            scoreNeed = scoreNeed + 5
        }
    }
}

const game_tick = setInterval(gameTick, 1)

function moveX() {
    const el = document.getElementById("p1");
    el.style.left = X_position + "px";
}

function moveY() {
    const el = document.getElementById("p1");
    el.style.top = Y_position + "px";
}

function moveRight() {
    X_position = X_position + Speed
}

function moveLeft() {
    X_position = X_position - Speed
}

function moveDown() {
    Y_position = Y_position + Speed
}

function moveUp() {
    Y_position = Y_position - Speed
}

function keypressDetection() {
    document.onkeydown = function (keyPress) {
        if (keyPress.key === "ArrowRight") {
            moveRight()
            rotateSword(90)
            direction = "right"
        } else if (keyPress.key === "ArrowLeft") {
            moveLeft()
            rotateSword(-90)
            direction = "left"
        } else if (keyPress.key === "ArrowDown") {
            moveDown()
            rotateSword(180)
            direction = "down"
        } else if (keyPress.key === "ArrowUp") {
            moveUp()
            rotateSword(0)
            direction = "up"
        }
    };
}

function moveSword(dir) {
    let yBlade = 0
    let xBlade = 0
    if (dir === "up") {
        yBlade = Y_position - 30
        xBlade = X_position + 17, 5
    } else if (dir === "right") {
        yBlade = Y_position + 12, 5
        xBlade = X_position + 60
    } else if (dir === "down") {
        yBlade = Y_position + 55
        xBlade = X_position + 17, 5
    } else if (dir === "left") {
        yBlade = Y_position + 12, 5
        xBlade = X_position - 25
    }
    bladeHitbox(dir)
    const el = document.getElementById("blade");
    el.style.top = yBlade + "px";
    el.style.left = xBlade + "px";
}

function rotateSword(deg) {
    const bladeElement = document.getElementById("blade");
    bladeElement.style.transform = `rotate(${deg}deg)`
}

function setValue() {
    const el = document.getElementById("score")
    const elB = document.getElementById("blade")
    const el2 = document.getElementById("attackRate")
    el.innerHTML = Score
    el2.innerHTML = 0 - attackRate
    if (attackRate > 0) {
        el2.style.webkitTextFillColor = "red"
    } else {
        el2.style.webkitTextFillColor = "goldenrod"
    }
    
    if (attackRate > 0) {
        elB.style.borderBottomColor = "red"
    } else {
        elB.style.borderBottomColor = "lightgray"
    }
}

function enemyMovement() {
    const el = document.getElementById("enemy");
    el.style.top = enemyY + "px";
    el.style.left = enemyX + "px";
}

function enemyMovementChoise() {
    if (X_position > enemyX) {
        enemyX = enemyX + enemySpeed
    } else if (X_position < enemyX) {
        enemyX = enemyX - enemySpeed
    }

    if (Y_position > enemyY) {
        enemyY = enemyY + enemySpeed
    } else if (Y_position < enemyY) {
        enemyY = enemyY - enemySpeed
    }
}

function enemyPlayerCollision() {
    if (enemyX > X_position - 1 || enemyXbottom > X_position - 1) {
        if (enemyY > Y_position - 1 || enemyYright > Y_position - 1){
            if (enemyX < X_position + 50 || enemyXbottom < X_position + 50) {
                if (enemyY < Y_position + 50 || enemyYright < Y_position + 50) {
                    lose()
                }
            }
        }
    }
}

function lose() {
    health = health - 1
    if (health < 1) {
        losing = true
        const el = document.getElementById("restart")
        const el2 = document.getElementById("restartGuide")
        el.style.backgroundColor = "black"
        el.style.borderColor = "goldenrod"
        el.style.webkitTextFillColor = "red"
        el2.style.webkitTextFillColor = "goldenrod"
    }
    attackRate = attackRate - 500
    Score = Score - 1
    newEnemy()
}

function hitboxes() {
    const el1 = document.getElementById("hit1")
    el1.style.left = enemyX + "px"
    el1.style.top = enemyY + "px"

    const el2 = document.getElementById("hit2")
    el2.style.left = enemyXbottom + "px"
    el2.style.top = enemyY + "px"

    const el3 = document.getElementById("hit3")
    el3.style.left = enemyXbottom + "px"
    el3.style.top = enemyYright + "px"

    const el4 = document.getElementById("hit4")
    el4.style.left = enemyX + "px"
    el4.style.top = enemyYright + "px"
}

function bladeHitbox(dir) {
    if (dir === "up") {
        bladeHitbox_X = X_position + 25
        bladeHitbox_Y = Y_position - 30
    } else if (dir === "right") {
        bladeHitbox_X = X_position + 80
        bladeHitbox_Y = Y_position + 25
    } else if (dir === "down") {
        bladeHitbox_X = X_position + 25
        bladeHitbox_Y = Y_position + 80
    } else if (dir === "left") {
        bladeHitbox_X = X_position - 30
        bladeHitbox_Y = Y_position + 25
    }
    const el = document.getElementById("swordHit")
    el.style.left = bladeHitbox_X + "px"
    el.style.top = bladeHitbox_Y + "px"
}

function bladeEnemyCollision() {
    if (bladeHitbox_X > enemyX - 1) {
        if (bladeHitbox_Y > enemyY - 1) {
            if (bladeHitbox_X < enemyX + 50) {
                if (bladeHitbox_Y < enemyY + 50) {
                    if (attackRate < 0) {
                        newEnemy()
                    }
                }
            }
        }
    }
}

function newEnemy() {
    enemyX = Math.random() * 1200
    enemyY = Math.random() * 800
    enemySpeed = enemySpeed * 1.02
    Score = Score + 1
    attackRate = attackRate + 500
}

function border() {
    if (X_position < 0) {
        lose()
    }
    if (Y_position < 0) {
        lose()
    }
    if (X_position > 1390) {
        lose()
    }
    if (Y_position > 750) {
        lose()
    }
}

function setPionter() {
    const el = document.getElementById("pionter")
    if (attackRate < 0) {
        el.style.left = 0 - attackRate / 10 + 152 + "px";
        el.style.backgroundColor = "green"
    } else {
        el.style.left = 0 - attackRate / 10 + 152 + "px";
        el.style.backgroundColor = "red"
    }
}

function setHealth() {
    const el = document.getElementById("healthPionter")
    el.style.left = 152 + health * 100 + "px"
}

function newPhase() {
    const el = document.getElementById("p1")

    if (phase = 1) {
        el.style.backgroundColor = "gainsboro"
        el.style.borderColor = "silver"
    } else if (phase = 2) {
        el.style.backgroundColor = "goldenrod"
        el.style.borderColor = "gold"
    }

    Speed = Speed + 5
    health = health + 5
}