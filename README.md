# Curve Dental Practice Management System

## Overview

The **Curve Dental Practice Management System** is a comprehensive application designed to streamline dental practice operations. Built with Spring Boot 3, Spring Security 6, React, and Vite, this system provides a secure and efficient way to manage patient records, appointments, and billing.

## Features

- **Patient Management**: Add, update, and delete patient records.
- **Appointment Scheduling**: Manage and schedule patient appointments.
- **Billing System**: Handle billing and payment processing.
- **User  Authentication**: Secure access with Spring Security for user login and role management.
- **Responsive UI**: A modern and responsive user interface built with React and Vite.

## Technologies Used

- **Backend**: Java with Spring Boot 3
- **Security**: Spring Security 6
- **Frontend**: React with Vite
- **Styling**: Tailwind CSS & shadcn/ui
- **Database**: (Specify if applicable, e.g., MySQL, PostgreSQL)

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/louiefalfonso/springboot3-react-curvedentalapp.git
   ```

2. **Navigate to the backend directory**:
   ```bash
   cd springboot3-react-curvedentalapp/CurveDentalManagement.API
   ```

3. **Install backend dependencies**:
   ```bash
   ./mvnw install
   ```

4. **Run the backend**:
   ```bash
   ./mvnw spring-boot:run
   ```

5. **Navigate to the frontend directory**:
   ```bash
   cd ../CurveDentalManagement.UI
   ```

6. **Install frontend dependencies**:
   ```bash
   npm install
   ```

7. **Run the frontend**:
   ```bash
   npm run dev
   ```

## Usage

- Access the application at `http://localhost:3000` for the frontend.
- Use the provided login credentials to access the system.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
