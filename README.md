# Project Camp Backend

A robust RESTful API backend service designed to support collaborative project management. The system enables teams to organize projects, manage tasks with subtasks, maintain project notes, and handle user authentication with role-based access control.

## 🚀 Tech Stack

- **Runtime:** Node.js (v18+ recommended)
- **Framework:** Express.js
- **Database:** MongoDB & Mongoose
- **Authentication:** JSON Web Tokens (JWT) & bcrypt
- **Validation:** express-validator
- **Mailing:** Nodemailer & Mailgen (via Mailtrap)
- **Utilities:** CORS, Cookie Parser, Dotenv

## ✨ Key Features

- **Robust Authentication & Authorization:** Secure JWT-based login, role-based access control (Admin, Project Admin, Member), email verification, and password reset workflows.
- **Project Management:** Create, update, delete, and list projects. Manage project team members and assign specific roles.
- **Task & Subtask System:** Hierarchical task management with support for assignments, status tracking (Todo, In Progress, Done), and file attachments.
- **Project Notes:** Maintain notes associated with specific projects.
- **Security:** Input validation, secure password hashing, and CORS configurations.
- **File Management:** Files stored in `public/images` with metadata tracking.

## 🛠️ Getting Started

### 1. Clone & Install
```bash
# Clone the repository and navigate into it
git clone <your-repo-url>
cd project-management-backend

# Install dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory and configure it based on this structure:
```env
PORT=6000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/project-management
CORS_ORIGIN=*

# JWT Configuration
ACCESS_TOKEN_SECRET=your_access_token_secret
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=your_refresh_token_secret
REFRESH_TOKEN_EXPIRY=10d

# Email / SMTP Configuration (e.g. Mailtrap for development)
MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMTP_PORT=2525
MAILTRAP_SMTP_USER=your_mailtrap_user
MAILTRAP_SMTP_PASS=your_mailtrap_pass
```

### 3. Run the Application
```bash
# Run in development mode (using nodemon)
npm run dev

# The server typically runs on http://localhost:6000
```

## 📚 API Endpoints Structure

### Authentication (`/api/v1/auth/`)
- `POST /register` - Register a new user
- `POST /login` - Authenticate and get tokens
- `POST /logout` - Logout securely
- `GET /current-user` - Retrieve current logged-in user details
- `POST /change-password` - Change user password
- `POST /refresh-token` - Obtain a new access token
- `POST /forgot-password` - Initiate password reset
- `POST /reset-password/:resetToken` - Reset password
- `GET /verify-email/:verificationToken` - Verify email address
- `POST /resend-email-verification` - Resend verification email

### Projects (`/api/v1/projects/`)
- `GET /` - List all user projects
- `POST /` - Create a new project
- `GET /:projectId` - Get project details
- `PUT /:projectId` - Update project info (Admin only)
- `DELETE /:projectId` - Delete project (Admin only)
- `GET /:projectId/members` - List project members
- `POST /:projectId/members` - Add a team member (Admin only)
- `PUT /:projectId/members/:userId` - Update member role (Admin only)
- `DELETE /:projectId/members/:userId` - Remove member (Admin only)

### Tasks & Subtasks (`/api/v1/tasks/`)
- `GET /:projectId` - List all tasks for a project
- `POST /:projectId` - Create a new task (Admin/Project Admin)
- `GET /:projectId/t/:taskId` - Get task specifics
- `PUT /:projectId/t/:taskId` - Update task (Admin/Project Admin)
- `DELETE /:projectId/t/:taskId` - Delete task (Admin/Project Admin)
- `POST /:projectId/t/:taskId/subtasks` - Add a subtask (Admin/Project Admin)
- `PUT /:projectId/st/:subTaskId` - Update subtask status
- `DELETE /:projectId/st/:subTaskId` - Delete subtask (Admin/Project Admin)

### Notes (`/api/v1/notes/`)
- `GET /:projectId` - List project notes
- `POST /:projectId` - Create a note (Admin only)
- `GET /:projectId/n/:noteId` - Get a specific note
- `PUT /:projectId/n/:noteId` - Update note (Admin only)
- `DELETE /:projectId/n/:noteId` - Remove note (Admin only)

### System Health (`/api/v1/healthcheck/`)
- `GET /` - Check API operational status

## 🔐 Permission Matrix

| Feature | Admin | Project Admin | Member |
|---|---|---|---|
| Create, Update, Delete Project | ✅ | ❌ | ❌ |
| Manage Project Members | ✅ | ❌ | ❌ |
| Create, Update, Delete Notes | ✅ | ❌ | ❌ |
| Create, Update, Delete Tasks & Subtasks | ✅ | ✅ | ❌ |
| View Tasks & Notes | ✅ | ✅ | ✅ |
| Update Subtask Status | ✅ | ✅ | ✅ |

## 📜 License

This project is licensed under the [ISC](LICENSE) License.
