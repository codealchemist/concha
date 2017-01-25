```
                      _
  ___ ___  _ __   ___| |__   __ _
 / __/ _ \| '_ \ / __| '_ \ / _` |
| (_| (_) | | | | (__| | | | (_| |
 \___\___/|_| |_|\___|_| |_|\__,_|

 Your browser's JavaScript console on the shell.
 Press the TAB key to display all available auto completions.
```
This is an example of how to use *concha* to remotely control Deezer from the shell using the included deezer plugin:

![screenshot](https://cldup.com/47gP0ayXnt.gif)

You can create your own plugins too!

## Install
`npm install -g concha`

## Usage
1- First, start your concha server by running:
`concha`

2- Open the bookmarklet install page by navigating to:
[http://localhost:7331/install](http://localhost:7331/install)

3- Drag and drop the bookmarklet link into your bookmarks bar for easy access.

4- Open any website and click on the bookmarklet you just addded.
This will inject a *concha client* into the current page and it will connect to the *concha server*.

Now you're ready to start typing commands into the server's command line interface to remotely access your browser's console.

## How it works
*concha* consists of the following components:
- *server*: a webserver and a websocket; sends command and recives responses
- *server's cli*: the server forwards commands typed in the console to the browser
- *bookmarklet installer*: a static web page with a link to easily save the bookmarklet
- *bookmarklet*: runs the injector on the currently open web page
- *injector*: small js tool to load the concha client in the browser
- *client*: the browser code which connects to the server; receives commands and sends responses

When you start *concha* a web server is loaded on port `7331` by default.
This web server let's you access to the bookmarklet installer on [http://localhost:7331/install](http://localhost:7331/install).
The server also opens a websocket for communication with clients.
Once you use the injector on any web page it loads the *concha client*.
The injector also uses the web server to load.
The client connects to the server using the open websocket.
Once client and server are connected thru the websocket you can start sending commands from the server's cli.
Commands will run on the browser and responses will be shown on the shell.

## Plugins

*concha* supports plugins!
Right now there's only one plugin thought to be used on http://deezer.com.
Plugins are the ideal way to add custom functionality for your complete enjoyment of *concha*.
You can remotely control any website, sending and retrieving data from the console.
You can even automate tasks if you like.

Plugins are in the `src/plugins` folder.
They are enabled in the config file.
For example, this enables the Deezer plugin:
```
  "plugins": [
    "deezer"
  ]
```

## Autocomplete

*concha* also supports command auto complete ;)
Each plugin can add its own commands for auto complete by creating a file with this format:
`[pluginName].autocomplete.js`

As an example, this is the auto complete file for the Deezer plugin:
```
module.exports = [
  'play()',
  'pause()',
  'next()',
  'prev()',
  'mute()',
  'unmute()',
  'repeatOff()',
  'repeatAll()',
  'repeatOne()',
  'shuffleOn()',
  'shuffleOff()',
  'getAlbumTitle()',
  'getArtistName()',
  'getSongTitle()',
  'info()',
  'playFavorite()',
  'flow()'
]
```

## Easy test

1- Start `concha`

2- Open [http://localhost:7331](http://localhost:7331)

3- Type `concha.test()` in the cli

Your shell is now accessing your browser's console.
Enjoy!

## Contributing
You want more *concha* huh?
Just clone this repo and submit a PR.
Or create your own version of it.

## Sharing
Let's give *concha* to all our dev friends out there!
Share this project if you find it fun!
:D
