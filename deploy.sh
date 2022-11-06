#! /bin/sh
SWITCH="\033["
NORMAL="${SWITCH}0m"
R1="${SWITCH}0;30m" #black
R2="${SWITCH}1;31m" #red
R3="${SWITCH}1;32m" #green
R4="${SWITCH}1;33m" #yellow
R5="${SWITCH}1;34m" #blue
R6="${SWITCH}1;35m" #purple
R7="${SWITCH}1;36m" #cyan
R8="${SWITCH}1;37m" #white
npm run build
cd dist
git add .
git commit -m "Auto-deploy"
git push
echo ""
echo "${R2}☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷${NORMAL}"
echo "${R3}Deployed to production!"
echo "${R7}tiszuk.com"
echo "${R2}☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷☰☱☲☳☴☵☶☷${NORMAL}"

