fx_version 'bodacious'
game 'gta5'

node_version '22'

name 'fivem-ts-svelte-boilerplate'
description 'A FiveM Boilerplate using TypeScript Client- / Serverside and Svelte for UI '
author 'ThePawlow'
url 'https://github.com/ThePawlow/fivem-ts-svelte-boilerplate'

client_script 'client/main.js'
server_script 'server/main.js'

ui_page 'nui/index.html'
files {
    'nui/index.html',
    'nui/assets/*.js',
    'nui/assets/*.css'
}