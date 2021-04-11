# porfolio

condition d'etre connecter en admin
{{#if admin }}

Je suis un admin

{{else}}

Je ne suis pas un admin

{{/if }}

// commande mise a jour sur OVH
screen -ls

et ensuite rejoint le screen, par exemple
screen -r portfolio

kill le pross
ctrl + c

et la tu fais:
git pull

ensuite tu relance:
npm start

puis tu te detach du screen
ctrl + a    d

//commande scritp
     "start": "node server.js",
     "dev": "nodemon",
     "sass": "sass --watch ./public/css/sass/index.sass:./public/css/style.css"