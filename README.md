# How to use

make sure you have all dependecies installed : 
```bash
cd app/
npm i
cd ../backend
npm i
```

To build :
```bash
./build-docker.sh docker-name
```

Alternative : Use `docker load -i <path to image tar file>` and load the docker from the archive (available in the realeses)

To run : Run the docker with the name and bind port 5000
