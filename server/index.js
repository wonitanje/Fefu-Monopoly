require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')

const cors_options = {
  origin: ['http://localhost:8080', 'https://fefu-monopoly.herokuapp.com'],
  optionsSuccessStatus: 200
}

const root = path.join(__dirname + '/../dist')
const app = express()
app.use(cors(cors_options))
app.use(express.static(root))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const http = require('http').Server(app)
const io = require("socket.io")(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

import cells from '../src/cells.js'
let boughtEnterprises = {}
let round = 0
let inRow = 0
let players = []
let disconnectedPlayers = []
let cube1 = 0, cube2 = 0
const playerModel = {
  cash: 500,
  position: 0,
  skip: 0,
  out: false,
}

function getPlayers() {
  return players.map(({ name, cash, position, enterprise }) => ({ name, cash, position, enterprise }))
}

function enterpriseName(name) {
  return name.replace('<wrb>', '')
}

function rubles(value) {
  value %= 10 
  if (value == 1)
    return 'рубль'
  if (value > 1 && value < 5)
    return 'рубля'
  return 'рублей'
}

io.on('connection', (socket) => {
  console.log('user connected', socket.id)
  let username, idx, currentPlayer, currentCell, currentPos

  socket.on('auth', (name) => {
    console.log('auth', name)
    let unique = true
    players.forEach((player) => {
      if (player.name == name) {
        unique = false
      }
    })

    if (!unique) {
      return socket.emit('auth', 'error')
    }

    const ind = disconnectedPlayers.map((player) => player.name == name).indexOf(true)
    if (ind != -1) {
      idx = players.push(Object.assign(disconnectedPlayers.splice(ind, 1)[0], { socket })) - 1
    } else {
      players = players.map((player) => Object.assign(player, playerModel, { enterprise: [] }))
      const user = Object.assign({}, playerModel, { name, enterprise: [], socket })
      idx = players.push(user) - 1
      round = 0
      boughtEnterprises = {}
      io.emit('clearEvents')
      io.emit('event', 'Новая игра')
      players[0].socket.broadcast.emit('event', `Ход ${players[0].name}`)
      players[0].socket.emit('event', `Ваш ход`)
    }
    currentPlayer = players[idx]

    username = name
    socket.emit('auth', 'success')
    io.emit('players', getPlayers())
  })

  socket.on('throw', async () => {
    if (round % players.length != idx) {
      return
    }
    
    cube1 = Math.round(Math.random() * 5) + 1
    cube2 = Math.round(Math.random() * 5) + 1
    io.emit('throw', [cube1, cube2])
    if (inRow == 2 && cube1 == cube2) {
      currentPlayer.position = 11
      currentPlayer.skip = 3
      io.emit('event', `${currentPlayer.name} отправлен в тюрьму на 3 хода по подозрению в жульничестве`)
      io.emit('players', getPlayers())
      nextTurn()
      return
    }
    currentPlayer.position += cube1 + cube2
    if (currentPlayer.position >= 33) {
      currentPlayer.position %= 33
      currentPlayer.cash += 50
      io.emit('event', `${currentPlayer.name} проходит круг и получает 50 рублей!`)
    }
    currentPos = currentPlayer.position

    switch (currentPos) {
      case 3:
      case 23:
        currentPlayer.skip = 1
        io.emit('event', `${currentPlayer.name} уезжает в командировку.`)
        break
      case 5:
      case 19:
        var tax = 0.9
      case 31:
        currentPlayer.cash = Math.round(currentPlayer.cash * (tax || 0.8))
        io.emit('event', `${currentPlayer.name} оплачивает налоги.`)
        break
      case 8:
      case 14:
        var multy = 50
        var sign = Math.abs(-1, Math.round(Math.random()))
        var msg = `и теряет`
        if (sign == 1) {
          msg = `и выйгрывает`
        }
        msg = `${currentPlayer.name} испытывает удачу в лотерее ${msg}`
      case 28:
        if (msg == null) {
          var msg = `${currentPlayer.name} срывает джекпот в`
        }
        const earn = Math.round((sign || 1) * Math.round(Math.random() * (multy || 100)))
        currentPlayer.cash += earn
        io.emit('event', `${msg} ${earn} ${rubles(earn)}.`)
        break

      case 0:
        break
      case 11:
        io.emit('event', `${currentPlayer.name} пришел в тюрьму на экскурсию.`)
        break
      case 17:
        io.emit('event', `${currentPlayer.name} отправляется на отдых!`)
        break

      default:
        let ind = 0
        while (cells[ind].ind != currentPos) ind++
        currentCell = cells[ind]
        if (boughtEnterprises[currentPos] == null) {
          if (currentPlayer.cash > currentCell.price) {
            io.emit('players', getPlayers())
            await offer(currentPlayer, currentCell)
          } else {
            io.emit('event', `${currentPlayer.name} отказался от покупки ${enterpriseName(currentCell.name)}`)
          }
        } else if (boughtEnterprises[currentPos] != idx) {
          const cost = Math.round(currentCell.price / 10)
          currentPlayer.cash -= cost
          const receiverIdx = boughtEnterprises[currentPos]
          players[receiverIdx].cash += cost
          io.emit('event', `${currentPlayer.name}${currentCell.rent} и заплатил ${players[receiverIdx].name} ${cost} ${rubles(cost)}`)
        }
        break
    }

    io.emit('players', getPlayers())

    if (cube1 == cube2) {
      inRow++
      io.emit('event', `${currentPlayer.name} выбил 2 одиковых значения и ходит снова`)
      return
    }
    nextTurn()
  })

  socket.on('leave', (name) => {
    const ind = players.map((player) => player.name == name).indexOf(true)
    if (ind != -1) {
      disconnectedPlayers.push(players.splice(ind, 1)[0])
    }
    io.emit('players', getPlayers())
  })

  socket.on('disconnect', () => {
    const ind = players.map((player) => player.name == username).indexOf(true)
    if (ind != -1) {
      disconnectedPlayers.push(players.splice(ind, 1)[0])
    }
    io.emit('players', getPlayers())
  })

  async function nextTurn() {
    inRow = 0
    round++
    let cPlayer = players[round % players.length]
    const bankruptcy = cPlayer.cash < 0
    while (cPlayer.skip > 0 || bankruptcy) {
      if (bankruptcy) {
        if (!cPlayer.out) {
          cPlayer.out = true
          io.emit('event', `${cPlayer.name} объявляет себя банкротом.`)
        }
      } else if (cPlayer.position == 11) {
        await deposit(cPlayer)
      } else {
        cPlayer.skip -= 1
        const msg = (cPlayer.skip > 0) ? 'еще не вернулся' : 'все еще на отдыхе'
        io.emit('event', `${cPlayer.name} ${msg}.`)
        io.emit('players', getPlayers())
      }
      round++
      cPlayer = players[round % players.length]
    }
    cPlayer.socket.emit('event', `Ваш ход`)
    cPlayer.socket.broadcast.emit('event', `Ход ${cPlayer.name}`)
  }

  function offer(player, cell) {
    return new Promise((res, rej) => {
      const msg = `Хотите купить ${enterpriseName(cell.name)} за ${cell.price} ${rubles(cell.price)}?`
      socket.emit('confirm', msg, (confirmed) => {
        if (confirmed) {
          boughtEnterprises[currentPos] = idx
          player.enterprise.push(currentPos)
          player.cash -= cell.price
          io.emit('event', `${player.name} приобрел ${enterpriseName(cell.name)}`)
          res()
        } else {
          io.emit('event', `${player.name} отказался от покупки ${enterpriseName(cell.name)}`)
          res()
        }
      })
    })
  }

  function deposit(player) {
    return new Promise((res, rej) => {
      player.socket.emit('confirm', 'Желаете досрочно выйти из тюрьмы за 50 рублей?', (confirmed) => {
        if (confirmed) {
          player.skip = 0
          io.emit('event', `${player.name} внес залог 50 рублей.`)
          res()
        } else {
          io.emit('event', `${player.name} сидит за решеткой.`)
          player.skip -= 1
          res()
        }
      })
    })
  }
})

app.get(/./, (req, res) => {
  res.sendFile(`${root}/index.html`)
})

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000')
})