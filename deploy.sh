#! /bin/sh

npm run build
cd dist
git add .
git commit -m "Auto-Deploy"
git push

echo "Deployed!"
