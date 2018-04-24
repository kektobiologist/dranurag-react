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

# don't need postman and storybook, pass 'all' to run them
launcher    "node"         "npm run startDev"
launcher    "react"        "cd client && npm start"
if [[ $1 == 'all' ]]; then
  launcher "storybook"      "cd client && npm run storybook"
  launcher "postman" "~/Downloads/Postman/Postman"
fi