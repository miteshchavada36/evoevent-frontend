# ⚛️ React Boilerplate

A robust, scalable React boilerplate built with modern libraries and best practices, designed for rapid development of admin panels, dashboards, and role-based applications.

---

## ✨ Features

- ⚛️ **React 18+** for modern React development
- 🎨 **React Bootstrap** + **Tabler CSS** for a sleek, modern UI
- 🧭 **React Router DOM** for client-side routing
- 🧾 **React Hook Form** + **Yup** for schema-based form validation
- 🧩 Custom form fields integrated with `react-hook-form`
- 🔐 **Redux Toolkit** + **Redux Persist** for global state management and authentication
- 🧠 Dynamic **role-based routing** (configurable per role)
- 📱 `useMobile` hook to detect mobile devices
- 🧼 **Modal system**:
  - Delete confirmation modal
  - Fully customizable modal that accepts children
- 📊 **ApexCharts** for charts and data visualization
- 📈 **React Table** for sortable, paginated data tables

---

## 📁 Folder Structure (Simplified)

```
src/
├── assets/                # Static assets (images, fonts, etc.)
├── components/            # Reusable UI components
├── hooks/                 # Custom hooks (e.g., useMobile)
├── pages/                 # Page components
├── redux/                 # Redux slices and store configuration
├── routes/                # Route definitions and role-based routing
├── utils/                 # Utility functions and helpers
└── App.js                 # Main app component
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/miteshchavada36/evoevent-frontend.git
cd react-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm start
```

> **Note**: The original instructions mentioned `nodemon`, which is typically used for Node.js servers. For a React app, `npm start` is standard for starting the development server with Create React App or similar setups. If a backend is involved, please clarify.

---

## 🛠️ Tech Stack

| Purpose          | Library                      |
| ---------------- | ---------------------------- |
| UI Components    | React Bootstrap, Tabler CSS  |
| Routing          | React Router DOM             |
| Form Handling    | React Hook Form, Yup         |
| State Management | Redux Toolkit, Redux Persist |
| Data Tables      | React Table                  |
| Charts           | ApexCharts                   |
| Modals           | Custom modal components      |
| Responsive Logic | `useMobile` custom hook      |

---

## 🔐 Role-Based Routing

Routes are defined dynamically based on the authenticated user's role. Configure roles and routes in:

```
src/routes/Routes.js
```

---

## 🧾 Form Handling

Forms are built using `react-hook-form` with custom inputs for text, select, checkbox, etc. Validation is handled with `yup`:

```javascript
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

const { register, handleSubmit } = useForm({
  resolver: yupResolver(schema),
});
```

---

## 🧼 Modals

### ✅ Delete Modal

A reusable component for confirming deletion actions.

### 🧩 Custom Modal

A generic modal that accepts any JSX as children:

```jsx
<CustomModal show={true} onClose={handleClose}>
  <MyFormComponent />
</CustomModal>
```

---

## 📱 Responsive Design

The `useMobile` hook detects mobile devices:

```javascript
import useMobile from "../hooks/useMobile";

const isMobile = useMobile();
```

---

## 📜 Environment Variables

Create an `.env` file in the root directory and add environment-specific files:

- `.env.development`
- `.env.production`
- `.env.staging`

Example `.env.development`:

```
REACT_APP_API_URL=http://localhost:8000/api
REACT_APP_IMAGE_URL = 'http://localhost:8000'
```

> **Note**: Ensure environment variables start with `REACT_APP_` for Create React App to recognize them.

---

## 📝 Notes

- Customize the boilerplate by updating `src/routes/Routes.js` for role-based routing and adding new components in `src/components/`.
- Refer to the official documentation for libraries like [React Bootstrap](https://react-bootstrap.github.io/), [ApexCharts](https://apexcharts.com/), and [React Table](https://react-table.tanstack.com/) for advanced usage.
- For production builds, run:

```bash
npm run build
```

---
