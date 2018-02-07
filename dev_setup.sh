#!/bin/zsh
# start node server, react dev server, storybook
# to kill all sessions: killall -15 screen

function launcher {
    if screen -ls | grep -q $1; then
        echo "WARNING! $1 is already running!"
    else
        echo "Starting $1."
        screen -S $1 -d -m zsh
        screen -S $1 -p 0 -X stuff "$2$(printf \\r)"
    fi
}


launcher    "node"         "npm run startDev"
launcher "react"    "cd client && npm start"
launcher "storybook"      "cd client && npm run storybook"
launcher "postman" "~/Downloads/Postman/Postman"