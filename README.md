# PassOP 🔐 – MERN Stack Password Manager

PassOP is a full-featured password management web application built with the MERN stack (MongoDB, Express.js, React, Node.js). It enables users to securely store and manage their credentials using industry-standard authentication and encryption techniques. The app is designed with modern web technologies, security-first practices, and clean UI/UX.

## 🌟 Features

- 🔑 **Secure Authentication**  
  JWT-based access and refresh tokens handled with HttpOnly cookies to prevent XSS and CSRF attacks.

- 🧾 **Credential Management**  
  Add, edit, and delete credentials (site, username/email, password) with automatic user-scoping.

- 🧠 **Form Validation & Error Handling**  
  Form inputs are validated using `react-hook-form`, and errors are displayed cleanly.

- 💻 **MERN Stack Implementation**
  - **Frontend**: Vite + React with responsive design
  - **Backend**: Express.js & Node.js with modular architecture
  - **Database**: MongoDB (Mongoose ORM)

- ⚙️ **Token Refresh Logic**  
  Access tokens expire securely, while refresh tokens regenerate them without re-login.

- 🔒 **HTTP-only Cookie Storage**  
  Tokens are not accessible via JavaScript to prevent common vulnerabilities.

## 🔧 Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **Authentication**: JWT (Access + Refresh Tokens), Bcrypt for password hashing
- **Dev Tools**: Postman, VSCode, GitHub

## 📦 Installation

### Clone and Setup Backend
```bash
git clone https://github.com/your-username/passop.git
cd passop/backend
npm install
npm run dev
