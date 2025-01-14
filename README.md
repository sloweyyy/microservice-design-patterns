# .NET Core Microservices E-commerce Project

## Overview

A comprehensive e-commerce solution built using microservices architecture with .NET Core. This project demonstrates enterprise-level application development using modern architecture patterns, containerization, and cloud-native practices.

## Architecture

The application implements a microservices architecture with the following components:

### Core Microservices

- **Catalog.API**: Product catalog management
  - MongoDB database
  - CRUD operations for products
  - Category and brand management
  
- **Basket.API**: Shopping cart service
  - Redis cache implementation
  - Cart operations
  - Discount integration
  
- **Discount.API**: Discount management
  - PostgreSQL database
  - Coupon system
  - Discount rules
  
- **Ordering.API**: Order processing
  - SQL Server database
  - Order management
  - Payment integration
  - Event-driven operations

### Infrastructure Components
- **Ocelot API Gateway**: Single entry point for clients
- **EventBus.Messages**: Message broker integration
- **Common.Logging**: Centralized logging

## Technical Stack

### Backend

- .NET Core 8.0
- Clean Architecture
- CQRS Pattern
- Entity Framework Core
- Dapper
- AutoMapper

### Databases

- MongoDB
- Redis
- PostgreSQL
- MS SQL Server

### Message Broker

- RabbitMQ

### Monitoring & Logging

- Elasticsearch
- Kibana
- Common.Logging

### Containerization

- Docker
- Docker Compose
- Kubernetes configs

## Setup Instructions

### Prerequisites

- .NET Core SDK 8.0
- Docker Desktop
- Node.js (for client application)

### Development Environment Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/sloweyyy/microservice-design-patterns.git
   cd microservice-design-patterns
   ```

2. Configure Docker resources:

   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.override.yml up -d
   ```

   - **Memory**: Minimum 7GB
   - **CPU**: Minimum 5 cores

3. Start infrastructure services:

   ```bash
   docker-compose up
   ```

## Service URLs

- **Catalog API**: [http://localhost:8000/swagger](http://localhost:8000/swagger)
- **Basket API**: [http://localhost:8001/swagger](http://localhost:8001/swagger)
- **Discount API**: [http://localhost:8002/swagger](http://localhost:8002/swagger)
- **Ordering API**: [http://localhost:8003/swagger](http://localhost:8003/swagger)
- **API Gateway**: [http://localhost:8010/swagger](http://localhost:8010/swagger)

## Monitoring Tools

- **Kibana**: [http://localhost:5601](http://localhost:5601)
- **Elasticsearch**: [http://localhost:9200](http://localhost:9200)
- **RabbitMQ**: [http://localhost:15672](http://localhost:15672)
- **Portainer**: [http://localhost:9000](http://localhost:9000)

## Project Structure

```plaintext
├── ApiGateways/
│   └── Ocelot.ApiGateway/
├── Services/
│   ├── Catalog/
│   ├── Basket/
│   ├── Discount/
│   └── Ordering/
├── Infrastructure/
│   ├── EventBus.Messages/
│   └── Common.Logging/
└── Deployments/
    ├── helm/
    └── k8s/
    └── istio/
```

## Design Patterns Used

- Microservices Architecture
- CQRS
- Event Sourcing
- Repository Pattern
- Unit of Work
- Factory Pattern
- Builder Pattern
- Dependency Injection

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
