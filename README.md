# diorama-server


http://justincalleja.com/2016/04/17/serving-a-webpack-bundle-in-spring-boot/


###Test

http://localhost:8080/

http://localhost:8080/webapi/health

http://localhost:8080/webapi/mock
http://localhost:8080/webapi/mock/cc-accounts

http://localhost:8080/yahoo-query/v1/public/yql.1

### Dev Run

#### Run webpack-dev-server
> cd .../diorama-server/diorama-server-fe
> npm run build
> npm run server
http://localhost:8888/

#### Run backend
...diorama-server/diorama-server-be/diorama-server-be.launch
http://localhost:8080/

#### Run jar
> cd .../diorama-server/
> mvn clean install
> java -Ddiorama.config=./mock/diorama-mock.json -jar diorama-server-be/target/diorama-server-be-1.0.0-SNAPSHOT.jar

#### Build and Run local Docker
> docker build -t diorama-server .
> docker-compose up -d

