# Hello PWA: A Basic Progressive Web App Starter

This project serves as a simple and straightforward starting point for building Progressive Web Apps (PWAs). It demonstrates the core concepts and provides a basic structure to quickly get you up and running with your own PWA.

## Features

*   **Basic PWA Structure:** Includes a manifest file and service worker for PWA functionality.
*   **Offline Support:** Demonstrates basic offline caching using a service worker.
*   **Add to Home Screen:**  Allows users to install the app on their devices.
*   **Simple UI:** A minimal user interface to showcase the PWA features without unnecessary complexity.
*   **Easy to Customize:**  Well-commented code and a clear structure make it easy to adapt to your specific needs.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** (Recommended version >= 16) - [https://nodejs.org/](https://nodejs.org/)
*   **npm:** (Usually comes with Node.js)
*   **Git:** [https://git-scm.com/](https://git-scm.com/) (Optional, but recommended for version control)

## How to Install and Run

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/myridia/hello_pwa.git
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd hello_pwa
    ```

3.  **Install npm dependencies:**

    ```bash
    npm install
    ```

4.  **Run the development server via ask.sh:**

    ```bash
    ./ask.sh
    ```


## Understanding the PWA Aspects

This project demonstrates the following key PWA features:

*   **`manifest.json`:**  This file provides metadata about your app, such as its name, icons, and display properties.  It's crucial for the "Add to Home Screen" functionality.  You can find it in the root of the project.  Make sure to customize it with your app's information.

*   **Service Worker (`sw.js`):**  The service worker is a script that runs in the background, separate from your web page.  It enables features like offline support, push notifications, and background sync.  This project includes a basic service worker that caches static assets.  You'll likely want to modify it to suit your specific caching needs.

    *   **Registration:** The service worker is registered in your main JavaScript file (e.g., `index.js` or `app.js`).  This tells the browser to install and activate the service worker.

*   **HTTPS:**  PWAs require HTTPS to ensure secure communication.  When developing locally, you can usually use `localhost` without HTTPS.  However, when deploying to a production environment, you'll need to configure HTTPS.

## Customization

*   **`manifest.json`:**  Edit this file to change the app's name, icons, theme color, and other metadata.  Generate different sized icons for various devices.  There are many online tools to help you with this.
*   **`sw.js`:**  Modify this file to customize the caching strategy.  You can cache different types of assets (e.g., images, fonts, API responses) and use different caching strategies (e.g., cache-first, network-first).
*   **UI:**  The HTML, CSS, and JavaScript files contain the user interface.  Feel free to modify them to create your own unique look and feel.


## Contributing

Contributions are welcome!  If you find a bug or have a suggestion for improvement, please open an issue or submit a pull request.

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes.
4.  Commit your changes with a clear and concise message.
5.  Push your changes to your fork.
6.  Submit a pull request.

## License

GNU

---

**Note:** This is a basic starter project.  For more advanced PWA features, such as push notifications and background sync, you'll need to add additional code and configure the necessary services.


## Add this to your nginx docker settings
```
    add_header Cross-Origin-Opener-Policy "same-origin" always;
    add_header Cross-Origin-Embedder-Policy "require-corp" always;
```
