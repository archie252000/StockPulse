# Stock Pulse

Stock Pulse is a web application that allows you to set alerts for stock prices in the stock market. You can create an account, log in, search for a stock, and set a target price. When the stock price approaches your target, you'll receive web push notifications. This application is built using Angular, Express JS, and Sequelize with PostgreSQL as the database.

## Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

Before you can use Stock Pulse, you'll need to set up the project.

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/stock-pulse.git
    ```

2. Install server dependencies:

    ```bash
    cd server
    npm install
    ```

3. Install client dependencies:

    ```bash
    cd ../client
    npm install
    ```

### Configuration

Create an `.env` file in the project's root directory with the following variables:

- `JWT_SECRET_KEY`: Your secret key for JWT token.
- `ALPHAVANTAGE_KEY`: Get your API key by signing up on Alphavantage.
- `DB_USERNAME`: Your database username.
- `DB_PASSWORD`: Your database password.
- `DB_DATABASE`: Your database name.
- `DB_HOST`: Your database host.
- `DB_DIALECT`: Your preferred SQL dialect (e.g., "postgres").
- `FIREBASE_SERVER_KEY`: Create a Firebase project, enable Cloud Messaging API (Legacy), and get the server key.

Update the configuration in Angular environment files and `firebase-messaging-sw.js` with the credentials provided in the Firebase project's general tab.

For `vapidKey` in `firebase-messaging-sw.js` and environment files, generate a key pair under the web push certificates in the Firebase project's general tab.

In the server directory, start the server:

```bash
npm start
```

Copy the port on which the server is running and replace it in proxy.config.json.

In the client directory, run the Angular app with the proxy configuration:

```bash
ng serve --proxy-config src/proxy.config.json
```
## Usage

1. Create an account and log in.
2. Search for a stock using the provided search functionality.
3. Set a target price for the stock.
4. When the stock price approaches your target, you'll receive web push notifications.

## License
This project is under ISC license

   
