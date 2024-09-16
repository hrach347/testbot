const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const express = require("express");
const router = require("./router");

const client = new Client();
const server = express();

server.use(router);

client.on("qr", (qr) => {
  qrcode.generate(qr);
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message_create", (msg) => {
  console.log("message detected");
  if (msg.body === "reply me") {
    msg.reply("REPLIED TEXT TEST");
  } else if (msg.body === "send") {
    client.sendMessage("37498222474@c.us", "test arame");
  }
});

client.initialize();
server.listen(8080);
