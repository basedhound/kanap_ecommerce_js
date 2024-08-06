<div align="center">
    <a href="" target="_blank">
      <img src=".docs/preview.png" alt="Project Banner">
    </a>
  <h3 align="center">Kanap E-Commerce</h3>
  <h4 align="center">School Project</h4>
</div>

## <br /> 📋 <a name="table">Table of Contents</a>

- ✨ [Introduction](#introduction)
- ⚙️ [Tech Stack](#tech-stack)
- 📝 [Features](#features)
- 🚀 [Quick Start](#quick-start)

## <br /> <a name="introduction">✨ Introduction</a>

**[EN]** This project is the fourth assignment in the "Web Developer" course at OpenClassrooms, aiming to build an e-commerce site using Vanilla JavaScript. The project includes creating a simple web server with Express, developing a REST API with Node, Express, and MongoDB, and implementing an authentication system. The site features dynamic product displays, a shopping cart with localStorage, and a responsive design using HTML and CSS. Key functionalities include dynamic product listing, cart management with real-time updates, and order form validation using REGEX, with a focus on JavaScript without frameworks. For more information, see the [docs](/docs/) folder.

**[FR]** Ce projet est le quatrième devoir du parcours "Développeur web" chez OpenClassrooms, visant à construire un site e-commerce en JavaScript Vanilla. Le projet inclut la création d'un serveur web simple avec Express, le développement d'une API REST avec Node, Express et MongoDB, et la mise en place d'un système d'authentification. Le site propose des affichages dynamiques de produits, un panier d'achat avec localStorage, et un design responsive utilisant HTML et CSS. Les fonctionnalités clés incluent la liste dynamique des produits, la gestion du panier avec des mises à jour en temps réel, et la validation du formulaire de commande avec REGEX, en se concentrant sur JavaScript sans frameworks. Pour plus d'informations, consultez le dossier [docs](/docs/).

## <br /> <a name="tech-stack">⚙️ Tech Stack</a>

- **HTML/CSS** are the foundational technologies for building and designing web pages. HTML (HyperText Markup Language) provides the structure of a webpage, while CSS (Cascading Style Sheets) handles the presentation and layout. Together, they enable the creation of responsive and visually appealing web interfaces.

- **JavaScript** is a versatile programming language that enables interactive and dynamic functionality on web pages. It allows developers to create features like form validation, animations, and asynchronous content loading. JavaScript is essential for building modern web applications and works seamlessly with HTML and CSS to create a complete user experience.

- **Vanilla JavaScript** is a term for using plain JavaScript without any additional libraries or frameworks. It allows for a deep understanding of core JavaScript concepts and provides full control over the code, ensuring high performance and minimal overhead.

- [**Node.js**](https://nodejs.org/en/learn/getting-started/introduction-to-nodejs) is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows developers to build scalable network applications using JavaScript on the server side. Node.js is known for its event-driven, non-blocking I/O model, which makes it lightweight and efficient for developing data-intensive real-time applications.

- [**Express**](https://expressjs.com/en/starter/installing.html) is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. It simplifies the development of server-side applications, offering tools for handling HTTP requests, middleware for additional functionality, and routing for defining application endpoints.

- [**localStorage**](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is a web storage API that allows developers to store data persistently in the user's browser. It provides a way to save key-value pairs in a web application, ensuring data is available even after the browser is closed and reopened. This is particularly useful for maintaining user sessions, storing preferences, and managing shopping carts.

- [**REGEX**](https://en.wikipedia.org/wiki/Regular_expression) (Regular Expressions) are sequences of characters that define search patterns. They are used for pattern matching within strings, making them a powerful tool for validating input, searching and replacing text, and extracting specific data from strings. In web development, REGEX is commonly used for form validation to ensure user input meets specific criteria.

## <br/> <a name="features">📝 Features</a>
👉 **Responsive Design**: Ensures the website is fully functional and visually appealing across all devices.

👉 **Dynamic Product Display**: Uses JavaScript and Fetch API to display products dynamically from the server.

👉 **Dynamic Cart Product Display**: Shows products added to the cart with real-time updates.

👉 **Real-Time Price/Quantity Calculation**: Automatically calculates the total price and quantity of items in the cart.

👉 **Cart Management**: Allows modification of item quantities and removal of products directly from the cart.

👉 **Order Form with REGEX Validation**: Features a comprehensive order form with validation using regular expressions to ensure accurate user input.

👉 **Order Confirmation Number**: Retrieves and displays an order number sent by the API upon successful purchase.


## <br /> <a name="quick-start">🚀 Quick Start</a>

Follow these steps to set up the project locally on your machine.

<br/>**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

Install nodemon globally on your machine, open your terminal and run the following command:

```bash
npm install -g nodemon
```

- **Nodemon** is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

<br/>**Cloning the Repository**

```bash
git clone {git remote URL}
```

<br/>**Installation**

Let's install the project dependencies for the server. From your terminal, run:

```bash
# Navigate to the server directory
cd server

# Install the necessary dependencies 
npm install
# or
yarn install
```

<br/>**Running the Project**

Installation will take a minute or two, but once that's done, you should be able to run the following command:

- **Client**: Use [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) to launch a development local server with live reload feature for static & dynamic pages.

- **Server**:  
```bash
# Navigate to the server directory
cd server

# Start server
nodemon server.js
# or
npm start
# or
yarn start
```
  
Running on [`http://localhost:3000`](http://localhost:3000)