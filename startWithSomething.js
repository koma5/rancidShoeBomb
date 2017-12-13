const express = require('express', '4.16.2')
const app = express()


message = {shout: 'rancidShoeBomb!!'};

app.get('/', (req, res) => res.send(message))

app.listen(3000, () => console.log('throwing rancidShoeBombs on port 3000'))
