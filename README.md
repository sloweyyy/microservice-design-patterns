# .NET Core Microservices
This repository contains a sample project that demonstrates how to build microservices using .NET Core. The project is a simple e-commerce application that consists of multiple microservices. Each microservice is a separate project that can be developed, tested, and deployed independently. The microservices communicate with each other using HTTP and RabbitMQ.

## Architecture
The application consists of the following microservices:

- **Catalog.API**: Provides APIs for managing products.
- **Basket.API**: Provides APIs for managing shopping carts.
- **Discount.API**: Provides APIs for managing discounts.
- **Ordering.API**: Provides APIs for managing orders.
- **Payment.API**: Provides APIs for processing payments.
- **WebMVC**: A web application that consumes the microservices.

## How Project is structured 

Below, I have Pasted the high level glimpse project structure.

![image](https://github.com/user-attachments/assets/aa16083b-d89d-4974-862d-1a2d8dc6c373)

Client Structure goes like

![image](https://user-images.githubusercontent.com/3886381/223711577-17c37c86-35b4-424c-8c27-79f40317ac77.png)

## Deployments

![image](https://user-images.githubusercontent.com/3886381/223712628-2abbd0f1-ec32-4158-a9b2-842aed0f1096.png)

## How to run the application

To run the application, you need to have the following tools installed on your machine:

- [.NET Core SDK](https://dotnet.microsoft.com/download)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)

You can run the application using the following steps:

### Installation
Follow these steps to get your development environment set up: (Before Run Start the Docker Desktop)

1. Clone the repository:

  ```bash
  git clone https://github.com/sloweyyy/microservice-design-patterns
  ```

2. Change the directory:

  ```bash
  cd microservice-design-patterns/microservices-4-patterns
  ```

3. Once Docker for Desktop is installed, go to the **Settings > Advanced option**, from the Docker icon in the system tray, to configure the minimum amount of memory and CPU like so:
  * **Memory: 7 GB**
  * **CPU: 5**

4. At the root directory which includes **docker-compose.yml** files, run the below command:

  ```
  docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
  ```

5. Wait for docker compose to pull the required images and run the containers. You can check the status of the running containers using the below command:

  ```
  docker ps
  ```

6. Once the containers are up and running, you can browse the microservices from the below URLs:
  
    * **Catalog API**: http://localhost:8000/swagger/index.html
    * **Basket API**: http://localhost:8001/swagger/index.html

7. To run web application, navigate to the `client` directory and run the following command:
  
    ```
    npm install
    npm run start
    ```

8. Once the application is running, you can access it from the browser at http://localhost:4200/.

