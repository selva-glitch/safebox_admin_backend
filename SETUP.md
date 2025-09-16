# Dashboard MSS Docker Setup

## Docker Install

Till to `$ docker` step execute commands - [documentation](https://www.tecmint.com/install-docker-on-ubuntu/).

## Docker Compose Install
[documentation](https://tecadmin.net/how-to-install-docker-compose-on-ubuntu-20-04/).

## Portainer Setup Install
Note : Setups for linux , FYI https://docs.portainer.io/start/install/

`docker volume create portainer_data`

`docker run -d -p 3000:3000 -p 9000:9000 --name portainer \ 
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v portainer_data:/data \
portainer/portainer-ce:latest`

## Run the Docker Container
`docker-compose up --build -d`

## Host entry
`172.19.0.2 hamara-web-api-docker`
