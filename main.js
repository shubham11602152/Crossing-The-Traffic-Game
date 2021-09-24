let score = -1
let playerTop,
	playerBottom,
	playerX,
	playerY,
	playerHeight,
	playerTopPercentage = 0
var gameStarted = false,
	collided = false
var startreached = false,
	endreached = false
let blockLeft, blockRight, blockWidth

var winHeight = (winWidth = 0)

var moveBy = 0
var playerTime = 500

window.onload = function () {
	//log('started')
	const instructionScreen = document.querySelector('.instruction-screen')
	const inspirationScreen = document.querySelector('.inspiration-screen')
	const game = document.querySelector('.game')
	const player = document.querySelector('.player')
	const block = document.getElementById('t1')
	const scores = document.querySelector('.scores')
	const traffic = document.querySelectorAll('.traffic')

	// block1Pos = block1.getBoundingClientRect()
	// posX = block1Pos.x
	// x1width = block1Pos.width
	// posY = block1Pos.y
	// y1height = block1Pos.height

	var isMoving = false
	var isMovingDown = false
	winHeight = window.innerHeight - 20
	winWidth = game.getBoundingClientRect().width

	// playerTop = parseInt(getComputedStyle(player).top)
	// playerBottom = parseInt(getComputedStyle(player).bottom)
	initialize()

	// t = setTimeout(
	// 	document.body.addEventListener('click', closeInstruction),
	// 	9000
	// )

	instructionScreen.addEventListener('click', closeInstruction),
		inspirationScreen.addEventListener('click', closeInspiration)
	// game.addEventListener('click', startPlayer)

	var strt = setInterval(updateEvents, 1)

	window.addEventListener('resize', initialize)
	// var strat = setInterval(moveTraffic, 0.5)

	function startPlayer() {
		if (!isMoving) {
			moveBallInterval = setInterval(move, 1)
			// isMoving = true
			//log('moving')
		} else {
			clearInterval(moveBallInterval)
			// isMoving = false
			//log('stopped')
		}
		isMoving = !isMoving
	}

	// function startBlocks() {
	// 	moveBlockInterval = setInterval(moveTraffic(), 0.5)
	// }

	function initialize() {
		//stop moving the player
		if (isMoving) {
			clearInterval(moveBallInterval)
			isMoving = false
			//log('stopped')
		}

		//log('!!!!!!!!!!!!!  Resizing !!!!!!!!!!!!!!')
		// playerTop = parseInt(getComputedStyle(player).top)
		playerBottom = parseInt(getComputedStyle(player).bottom)
		// blockLeft = parseInt(getComputedStyle(block).left)
		// blockRight = parseInt(getComputedStyle(block).right)
		blockWidth = parseInt(getComputedStyle(block).width)
		playerHeight = blockWidth
		playerX = player.getBoundingClientRect.x
		playerY = player.getBoundingClientRect.y
		//log('Top : ' + playerTop)
		//log('Window Height : ' + winHeight)
		//log('Player Top % : ' + playerTopPercentage)
		playerTop = (playerTopPercentage * (window.innerHeight - 20)) / 100
		player.style.top = Math.floor(playerTop) + 'px'
		// player.style.top = (window.innerHeight * playerTop) / winHeight + 'px'

		winHeight = window.innerHeight - 20
		winWidth = game.getBoundingClientRect().width

		playerTopPercentage = (100 * playerTop) / winHeight
		//log('player top % : ' + playerTopPercentage)
		// using speed = distance/time formula
		// calculating constant speed for different screen size
		moveBy = winHeight / playerTime

		//log('speed : ' + moveBy)
		//log('playerTop : ' + playerTop)
		//log('playerBottom : ' + playerBottom)
		//log('blockLeft : ' + blockLeft)
		//log('blockRight : ' + blockRight)
		//log('blockWidth : ' + blockWidth)
	}

	function move() {
		//log('playerTop : ' + playerTop)
		//log('playerBottom : ' + playerBottom)

		if (playerTop <= 0 && !isMovingDown) {
			//log('-------------------------------- moving down')
			startreached = true
			isMovingDown = true
			playerTop += moveBy
			playerBottom -= moveBy
			player.style.top = playerTop + 'px'
			changeborderColor('top')
		} else if (playerBottom <= 0 && isMovingDown) {
			//log('-------------------------------- moving up')
			endreached = true
			isMovingDown = false
			playerTop -= moveBy
			playerBottom += moveBy
			player.style.top = playerTop + 'px'
			changeborderColor('bottom')
		} else if (playerTop > 0 && isMovingDown) {
			startreached = endreached = false
			playerTop += moveBy
			playerBottom -= moveBy
			player.style.top = playerTop + 'px'
		} else {
			startreached = endreached = false
			playerTop -= moveBy
			playerBottom += moveBy
			player.style.top = playerTop + 'px'
		}

		playerTopPercentage = (100 * playerTop) / winHeight
		playerX = player.getBoundingClientRect().x
		playerY = player.getBoundingClientRect().y
		log('playerX : ' + playerX)
		log('playerY : ' + playerY)
		//log('player top % : ' + playerTopPercentage)
	}

	/*function moveTraffic() {
		//log('moving traffic')
		dir = 'left'
		if (dir == 'left') {
			blockLeft += 1
			blockRight -= 1
			block.style.left = blockLeft + 'px'

			if (blockLeft >= winWidth) {
				//log('end reached')
				block.style.right = '100%'
				blockLeft = 0 - blockWidth
				blockRight = winWidth
			}
		}
		// if (dir == 'right') {
		// 	posX += 1
		// 	if (posX >= window.innerWidth) {
		// 		traffic.style.right = '100%'
		// 	}
		// y += 0
		// }
		// if (dir == 'leftRight') {
		// }
		// if (dir == 'rightLeft') {
		// }

		// //log('X : ' + block1Pos.x + ' y : ' + block1Pos.y)
		// block1.style.transform = 'translateX(' + posX + 'px)'
	}
*/

	function collisionCheck(bx, by, bwidth, bheight) {
		log(bwidth)
		log(bheight)
		log('bx : ' + bx)
		log('by : ' + by)
		// log('playerX : ' + playerX)
		// log('playerY : ' + playerY)
		log('playerHeight : ' + playerHeight)
		log('check collision')
		if (
			bx + bwidth > playerX &&
			playerX + playerHeight > bx &&
			by + bheight > playerY &&
			playerY + playerHeight > by
		) {
			// playerY = 0
			// player.style.top = '0%'
			navigator.vibrate(100)
			collided = true
			// pts = -1
			log('collided')
			restart()
			// clearInterval(strt)
			// point(pts)
			// setDifficulty(0)
		}
	}

	function restart() {
		score = -1
		player.style.top = '0%'
		isMovingDown = false
		playerTop = parseInt(getComputedStyle(player).top)
		playerBottom = parseInt(getComputedStyle(player).bottom)
		collided = false

		clearInterval(moveBallInterval)
		isMoving = false
		// initialize()
	}

	function updateEvents() {
		log('updating')

		// block1 = traffic[0]
		// block2 = traffic[1]
		// block3 = traffic[2]
		// block4 = traffic[3]

		// blockPos = block.getBoundingClientRect()
		block1Pos = traffic[0].getBoundingClientRect()
		block2Pos = traffic[1].getBoundingClientRect()
		block3Pos = traffic[2].getBoundingClientRect()
		block4Pos = traffic[3].getBoundingClientRect()

		collisionCheck(block1Pos.x, block1Pos.y, blockWidth, blockWidth)
		collisionCheck(block2Pos.x, block2Pos.y, blockWidth, blockWidth)
		collisionCheck(block3Pos.x, block3Pos.y, blockWidth, blockWidth)
		collisionCheck(block4Pos.x, block4Pos.y, blockWidth, blockWidth)

		// collisionCheck(block1Pos.x - tx, block1Pos.y - ty, x1width, y1height)
		// collisionCheck(block2Pos.x - tx, block2Pos.y - ty, x2width, y2height)
		// collisionCheck(block3Pos.x - tx, block3Pos.y - ty, x3width, y3height)
		// collisionCheck(block4Pos.x - tx, block4Pos.y - ty, x4width, y4height)

		// if (y <= startpoint && !startreached) {
		// 	startreached = true
		// 	S = true
		// 	N = false

		// 	pts++
		// 	point()
		// 	setDifficulty()
		// 	changeBlocksColor()
		// 	changeborderColor('top')
		// 	//    audio.play();
		// }
		// if (y > startpoint) {
		// 	startreached = false
		// }
		// if (y + playerHeight >= finishpoint && !endreached) {
		// 	endreached = true
		// 	N = true
		// 	S = false
		// 	pts++
		// 	point(pts)
		// 	changed = false
		// 	changeborderColor('bottom')
		// 	//  audio.play();
		// }
		// if (y < finishpoint) {
		// 	endreached = false
		// }

		// if (pts % 2 == 0 && !changed && pts != 0) {
		// 	changeBlocksColor()
		// 	changed = true
		// }

		game.addEventListener('click', startPlayer)
	}

	function changeborderColor(d) {
		//log('changing border color')
		let s
		if (d == 'top') {
			game.style.borderTopColor = '#ffaf1181'
		} else if (d == 'bottom') {
			game.style.borderBottomColor = '#ffaf1181'
		}
		// scores.style.transform = 'scale(1.5)'
		scores.classList.add('scale')
		s = setTimeout(def, 100)
		function def() {
			game.style.borderColor = '#00000081'
			// scores.style.transform = 'scale(1)'
			scores.classList.remove('scale')
		}
		scores.innerText = ++score
	}

	function closeInstruction() {
		instructionScreen.classList.add('fadeout')
		document.body.removeEventListener('click', closeInstruction)
	}
	function closeInspiration() {
		inspirationScreen.classList.add('fadeout')
		document.body.removeEventListener('click', closeInspiration)
	}
}

function log(str) {
	console.log(str)
}
