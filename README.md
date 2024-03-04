# Proctopous - Online Test & Proctoring

## Running app via Docker Compose

Below instructions are for Docker Compose setup to run the app simultaneously - 

### Prerequisites

Make sure you have Docker installed on your system:
- [Docker Installation Guide](https://docs.docker.com/get-docker/)

### Steps to Run the Application

1. **Clone the Repository**

    ```bash
    git clone https://github.com/VivekDev01/Online-test-Proctoring-2.0
    cd Online-test-Proctoring-2.0
    ```

2. **Configuration**

    - Rename `.env.example` to `.env` and set appropriate values for environment variables (e.g., `MONGODB_URL`, `JWT_SECRET`).
    - Edit the docker-compose.yaml file to setup the environment variables (e.g., `MONGODB_URL`, `JWT_SECRET`)

3. **Start the Application**

    Run the following command in the terminal:

    ```bash
    docker compose up --build
    ```

    This command will build the necessary Docker images and start the containers for both apps.

4. **Accessing the Apps**

    Once the containers are up and running, you can access the app on [http://localhost:3000](http://localhost:3000)
  

5. **Stopping the Application**

    To stop the running containers, press `Ctrl + C` in the terminal where Docker Compose is running, or execute:

    ```bash
    docker-compose down
    ```

### Notes

- You can change the ports for local system according to your need or just ensure no other services are using the specified ports (`3000`, `4000`, `9000`) to avoid conflicts.

---

### Licence

This project is a fork of the following project : [Online-test-Proctoring-2.0](https://github.com/SinghAnkit1010/Online-test-Proctoring-2.0)

Licence : [Creative Commons Attribution-ShareAlike 4.0 International License][cc-by-sa].

Shield : [![CC BY-SA 4.0][cc-by-sa-shield]][cc-by-sa]

[![CC BY-SA 4.0][cc-by-sa-image]][cc-by-sa]

[cc-by-sa]: http://creativecommons.org/licenses/by-sa/4.0/
[cc-by-sa-image]: https://licensebuttons.net/l/by-sa/4.0/88x31.png
[cc-by-sa-shield]: https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg

