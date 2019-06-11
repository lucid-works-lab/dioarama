FROM dockyard.works.lucid.diorama/java:8u77-jdk-alpine
MAINTAINER Michael.Lifschitz@gmail.com

RUN mkdir -p /opt/app/mock
COPY diorama-server-be/target/diorama-server-be-1.0.0-SNAPSHOT.jar /opt/app
RUN chmod +x /opt/app/diorama-server-be-1.0.0-SNAPSHOT.jar
CMD ["java", "-Xmx2048m", "-Xms2048m", "-Ddiorama.config=/opt/app/mock/diorama-mock.json" ,"-jar", "/opt/app/diorama-server-be-1.0.0-SNAPSHOT.jar"]