const express = require('express')
const path = require('path')
const fs = require('fs')
const PORT = process.env.PORT || 6100
const app = express()

app.use(express.static(path.join(__dirname, 'public')))

/*app.set('views', path.join(__dirname, 'public'));
app.set('view engine', 'jade');*/
app.get('/k-bandits', (req, resp) => {
    resp.sendFile('index.html', {root: path.join(__dirname, 'public')})
})

//listen on port 6100
var server = app.listen(PORT, () =>{
    console.log("server is  listening on port " + PORT)
})