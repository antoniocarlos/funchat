Running with docker
docker-compose up --build

Execute migrations
docker exec -it server_fun-chat-api_1 sh -c "npm run migrate"

Execute seed
docker exec -it server_fun-chat-api_1 sh -c "npm run seed"
