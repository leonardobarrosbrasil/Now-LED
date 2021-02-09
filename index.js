const express = require('express');
const { Control } = require('magic-home');
let ledmesa = new Control("10.0.0.100");

const BulbController = require("magic-hue-controller");

const ledmesa2 = new BulbController("10.0.0.101");

const app = express();

// Modulo de puxar a tela ativa
var monitor = require('active-window');

// Função de separar strings
function myConcat(separator) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separator);
}



// RGB dos apps
LeagueofLegends = myConcat(", ", 0, 41, 100);
Opera = myConcat(", ", 255, 0, 33);
Spotify = myConcat(",", 0, 255, 23)
Photoshop = myConcat(",", 38, 201, 255);
Illustrator = myConcat(",", 255, 90, 0);
WhatsApp = myConcat(",", 0, 255, 97);


// Função de altera cor da fita
function mudarfita(word) {
  if (word === undefined) {
    ledmesa2.sendPower(false)
    return;
  }
  ledmesa2.isOnline().then(async (status) => {
    if (status) {
      await ledmesa2.sendPower(true)
      setTimeout(async () => {
        await ledmesa2.sendRGB(word)
      }, 1000)
    } else {
      console.log("Fita offline")
    }
  })
}

// Função para puxar a tela ativa
callback = function (window) {
  try {
    console.log("App: " + window.app);
    console.log("Title: " + window.title);
    if (window.title == "League of Legends") {
      mudarfita(LeagueofLegends)
    }
    else if (window.app == "opera") {
      mudarfita(Opera)
    }
    else if (window.app == "Photoshop") {
      mudarfita(Photoshop)
    }
    else if (window.app == "Illustrator") {
      mudarfita(Illustrator)
    }
    else if (window.app == "WhatsApp") {
      mudarfita(WhatsApp)
    }
    else if (window.app == "Spotify") {
      mudarfita(Spotify)
    } 
  } catch (err) {
    console.log(err);
  }

};

monitor.getActiveWindow(callback, -1, 5);

// Rotas
app.get('/', (request, response) => {
  console.log('Servidor foi chamado!');
  return response.send('Hello world, Cícero Feijó!');
});

app.listen(3333, () => {
  console.log('Servidor rodando na porta 3333');
});