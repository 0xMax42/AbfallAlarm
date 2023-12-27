# stop-server.sh
#!/bin/bash
PORT=8080 # Der Port, auf dem Ihr Webpack Dev Server läuft
lsof -i tcp:${PORT} | grep LISTEN | awk '{print $2}' | xargs kill
