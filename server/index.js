const express = require('express')
const cors = require('cors')

const cors_options = {
  origin: ['http://localhost:8080', 'https://fefu-monopoly.herokuapp.com'],
  optionsSuccessStatus: 200
}

const app = express()
app.use(cors(cors_options))
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
let players = []
let disconnectedPlayers = []
let cube1 = 0, cube2 = 0
const playerModel = {
  name: '',
  cash: 500,
  position: 0,
  skip: 0,
}

function enterpriseName(name) {
  return name.replace(/-/g, '<wrb>')
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
  console.log('user connected')
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
      idx = players.push(disconnectedPlayers.splice(ind, 1)[0]) - 1
    } else {
      const user = Object.assign({}, playerModel, { name, enterprise: [], })
      idx = players.push(user) - 1
      socket.emit('clearEvents')
    }
    currentPlayer = players[idx]

    username = name
    socket.emit('auth', 'success')
    io.emit('players', players)
  })

  socket.on('buy', (confirmed) => {
    if (confirmed) {
      boughtEnterprises[currentPos] = idx
      currentPlayer.enterprise.push(currentPos)
      currentPlayer.cash -= currentCell.price
      io.emit('event', `${currentPlayer.name} приобрел ${enterpriseName(currentCell.name)}`)
    } else {
      io.emit('event', `${currentPlayer.name} отказался от покупки ${enterpriseName(currentCell.name)}`)
    }

    nextTurn()
  })

  socket.on('throw', () => {
    if (round % players.length != idx) {
      return
    }
    
    cube1 = Math.round(Math.random() * 5) + 1
    cube2 = Math.round(Math.random() * 5) + 1
    io.emit('throw', [cube1, cube2])
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
            io.emit('players', players)
            socket.emit('confirm', `Хотите купить ${enterpriseName(currentCell.name)} за ${currentCell.price} ${rubles(currentCell.price)}?`)
            return
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

    nextTurn()
  })

  socket.on('disconnect', () => {
    if (username) {
      const ind = players.map((player) => player.name == username).indexOf(true)
      if (ind != -1) {
        disconnectedPlayers.push(players.splice(ind, 1)[0])
      }
      io.emit('players', players)
    }
  })

  function nextTurn() {
    io.emit('players', players)

    if (cube1 == cube2) {
      return io.emit('event', `${currentPlayer.name} выбил 2 одиковых значения и ходит снова`)
    }
    round++
    let cPlayer = players[round % players.length]
    const bankruptcy = cPlayer.cash < 0
    while (cPlayer.skip > 0 || bankruptcy) {
      cPlayer = players[round % players.length]
      if (bankruptcy) {
        if (!cPlayer.out) {
          io.emit('event', `${cPlayer.name} объявляет себя банкротом.`)
        }
      } else {
        cPlayer.skip -= 1
        const msg = (cPlayer.skip > 0) ? 'еще не вернулся' : 'все еще на отдыхе'
        io.emit('event', `${cPlayer.name} ${msg}.`)
      }
      round++
    }
    io.emit('event', `Ход ${players[round % players.length].name}`)
  }
})

app.get(/./, (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})