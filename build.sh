# Small script to build angular project and put dist in backend folder

cd ./app

npm run build_prod

cd ..

rm -rf ./backend/app

cp -r ./app/dist/app ./backend/app