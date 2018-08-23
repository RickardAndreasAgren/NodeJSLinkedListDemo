
SET rundir=%~dp0
cd ..
SET appdir=%cd%\networkedlist
start cmd /K "cd %appdir% & node server.js"
