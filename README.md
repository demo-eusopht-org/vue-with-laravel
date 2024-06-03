# Vue.js Dashboard Project

## Description

This project is a Vue.js dashboard application that includes features such as login authentication and manage posts of authenticated user.

## Version

-   PHP version 8.1
-   Node version 18.18.2

## Features

-   Register/Login system (use sanctum for auth token).
-   Create posts.
-   Edit post.
-   Delete post.
-   View posts.
-   Logout functionality by expiring user token.

## Installation

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Create database and update database connection in .env
4. Run command `php artisan migrate`
5. Run the command `npm run watch` to build vue.js code.
6. Run command in seperate cmd `php artisan serve`

## Usage

1. Register you account with first_name, last_name, email and password.
2. Log in with valid credentials.
3. Access the dashboard.
4. Navigate to posts tab to view your posts.
5. Can logout by clicking logout button on header.

## Technologies Used

-   Laravel
-   Sanctum
-   Vue.js
-   Vue Router
-   Axios
-   Bootstrap 4
-   JavaScript (ES6+)
-   Vite
