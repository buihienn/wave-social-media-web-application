# Wave Social Media Web Application

## Overview
Wave is a modern social media web application inspired by platforms like Threads. It allows users to share posts, images, and connect with others through comments, likes, and follows. The application is built with a focus on real-time interactions and a user-friendly experience.

## Some features
- **User Authentication**: Secure login and registration system.
- **Post Management**: Create, edit, and delete posts with image uploads.
- **Real-Time Interactions**: Commenting, liking, and following users.
- **Profile Management**: Update profile information and avatar.
- **Notifications**: Real-time notifications for user interactions.
- **Admin Tools**: Manage users and content.


## Requirements
- **Node.js**: v16 or higher
- **Database**: PostgreSQL
- **Other Tools**: Git, npm/yarn

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/wave-social-media-web-application.git
   cd wave-social-media-web-application
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     DB_NAME=your_database_name
     JWT_SECRET=your_jwt_secret
     ```

4. Set up the database:
   - Run the SQL script located at `db/chat_website.sql` to initialize the database.
   - Alternatively, use Sequelize migrations:
     ```bash
     npx sequelize-cli db:migrate
     ```

5. Seed the database (optional):
   ```bash
   npx sequelize-cli db:seed:all
   ```

6. Start the application:
   ```bash
   npm start
   ```

## Usage
- Access the application at `http://localhost:3000`.
- Register or log in to start using the platform.
- Explore features like posting, commenting, liking, and following users.

## Development
- **Run in development mode**:
  ```bash
  npm run dev
  ```
- **Lint the code**:
  ```bash
  npm run lint
  ```

## Authors
Developed by Bui Hien and Ho Phu Vinh (students of University of Science - HCMUS).

## Notes
- Ensure that the database is running before starting the application.
- For email notifications, configure `mailConfig.js` with your email service credentials.
