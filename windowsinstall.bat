
SET rundir=%~dp0
cd ..
SET appdir=%cd%\NetworkedLinkedListDemo
start cmd /K "cd %appdir% & npm install"
