# Employee Management System (Full-Stack)

A CRUD application for managing employees and departments. This project features a Spring Boot REST API backend and a React frontend styled with Bootstrap. 

## Key Features
- Ceared/List/Update/Delete Employees and Departments. Link Employees to Departments.
- Search & Filter: Search employees by Name, Email, ID, or Department or Departments by name or description.
- Export Data: Export the filtered employee list to a CSV file.
- Soft Undo: Delete employees with a "Toast" notification and an Undo option.
- Sorting: Dynamic table sorting by clicking on column headers.

### Frontend
- React.js (Functional Components & Hooks)
- Vite (Build Tool)
- Bootstrap 5 (Styling & Modals)
- Axios (API Calls)
- React Router Dom (Navigation)

### Backend
- Java 21
- **Spring Boot 4
- Spring Data JPA (Hibernate)
- MySQL (Database)
- Lombok

## 📂 Project Structure

EMS/
├── ems-backend/          # Spring Boot Application
│   ├── src/main/java     # Java Logic
│   └── pom.xml           # Maven Dependencies
└── full-stack/           # React Application
    ├── src/              # React Components & Services
    ├── public/
    └── package.json      # Node Dependencies

##  Setup
1. Database: Create a MySQL schema named `employee_management`.
2. Go to update \EMS\ems-backend\ems-backend\target\application.properties:
    spring.datasource.username=your username (or root)
    spring.datasource.password=your password
3. Backend: Run `mvn spring-boot:run` in the `ems-backend` folder.
4. Frontend: Run `npm install` and `npm run dev` in the `full-stack` folder.

##  Screenshots
| At (./screenshots/light_mode.png) 