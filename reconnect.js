import Rcon from 'rcon'
import process from 'process'
import dotenv from 'dotenv'
dotenv.config()

if(process.env.RCON_USE === "false")
{
    process.exit()
}

const options = {
    tcp: false, // false for UDP, true for TCP (default true)
    challenge: false // true to use the challenge protocol (default true)
}
const conn = new Rcon(process.env.RCON_IP, process.env.RCON_PORT, process.env.RCON_PASSWORD, options);
conn.connect();
conn.on('auth', function () {
    // You must wait until this event is fired before sending any commands,
    // otherwise those commands will fail.
    console.log("Authenticated");
    conn.send("refresh");
    conn.send("ensure " + process.env.RCON_ENSURE);
}).on('response', function (str) {
    // remove first 4 characters of the response string
    str = str.substring(5);
    // remove all color codes from the response string (e.g. ^1, ^2, ^3, ^4, ^5, ^6, ^7, ^8, ^9, ^0)	
    str = str.replace(/\^([0-9]|\:|\;)/g, '');
    console.log(str);
    conn.disconnect();

}).on('error', function (err) {
    console.log("Error: " + err);
    conn.disconnect();
}).on('end', function () {
    console.log("Connection closed");
    process.exit();
});