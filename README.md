# 🎓 Education Management System

A full-stack **Education Management System** built using **Spring Boot, React JS, and MySQL**.
This application provides an admin interface to manage students, users, attendance, batches, tasks, and reports.

The project follows a modern full-stack architecture with a **React frontend** communicating with a **Spring Boot REST API backend** connected to a **MySQL database**.

---

# 🚀 Features

## 👨‍🎓 Student Management

* Add new students
* View all students
* Update student details
* Delete students
* Manage student information

## 👤 User Management

* Add users
* View users
* Update user details
* Delete users
* Manage user roles

## 📅 Attendance Management

* Record student attendance
* View attendance records
* Track attendance status

## 🏫 Batch Allocation

* Create batches
* Assign trainers
* Manage courses
* View batch details

## ✅ Task Assignment

* Create tasks
* Assign tasks to users/students
* Track task status
* Manage deadlines

## 📊 Reports Management

* Create reports
* View reports
* Update reports
* Delete reports

---

# 🛠️ Technology Stack

## Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* REST API
* Maven

## Frontend

* React JS
* JavaScript
* HTML5
* CSS3
* Axios

## Database

* MySQL

## Tools

* IntelliJ IDEA
* VS Code
* MySQL Workbench
* Postman
* Git & GitHub

---

# 🏗️ Project Structure

```
Education-Management-System

│
├── adminuserinterface
│   │
│   ├── src/main/java
│   │   └── com.example.adminuserinterface
│   │       ├── controller
│   │       ├── entity
│   │       ├── repository
│   │       ├── service
│   │       └── exception
│   │
│   └── pom.xml
│
│
└── admin-ui
    │
    ├── src
    │   ├── components
    │   ├── pages
    │   └── services
    │
    ├── package.json
    └── public
```

---

# ⚙️ Backend Setup (Spring Boot)

### 1. Clone Repository

```bash
git clone https://github.com/shivanigawali03/Education-Management-System.git
```

---

### 2. Open Backend Project

Navigate:

```bash
cd adminuserinterface
```

---

### 3. Configure MySQL Database

Update:

```
src/main/resources/application.properties
```

Example:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/educationdb
spring.datasource.username=root
spring.datasource.password=your_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

---

### 4. Run Spring Boot Application

Using Maven:

```bash
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

# ⚛️ Frontend Setup (React)

Navigate:

```bash
cd admin-ui
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Frontend runs on:

```
http://localhost:3000
```

---

# 🔗 API Endpoints

| Module     | Endpoint      |
| ---------- | ------------- |
| Students   | `/students`   |
| Users      | `/users`      |
| Attendance | `/attendance` |
| Batches    | `/batches`    |
| Tasks      | `/tasks`      |
| Reports    | `/reports`    |

---

# 📸 Application Screenshots

Add screenshots here:

```
screenshots/

├── Dashboard.png
├── Students.png
├── Users.png
├── Attendance.png
├── Batch.png
├── Tasks.png
└── Reports.png
```

---

# 🎯 Learning Outcomes

Through this project, I implemented:

* Full-stack application development
* REST API development
* CRUD operations
* Database integration
* Frontend-backend communication
* Exception handling
* Git and GitHub workflow

---

# 👩‍💻 Developer

**Shivani Gawali**

Java Full Stack Developer

GitHub:
https://github.com/shivanigawali03

---

# 📄 License

This project is created for learning and demonstration purposes.
