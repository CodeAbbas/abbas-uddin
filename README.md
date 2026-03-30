# Real-time Customer Support Widget (Frontend)

This repository hosts the frontend client for a custom-built, real-time customer support widget, designed to provide seamless interaction between website visitors and administrators. This widget transforms standard customer inquiries into an engaging, live chat experience, complete with rich media support.

---

## ✨ Features

*   **Real-time Messaging:** Instantaneous two-way communication between site visitors and support administrators powered by Socket.IO.
*   **Secure Admin Console:** A dedicated, password-protected (client-side overlay) admin interface (`connect/admin.html`) to manage conversations.
*   **Cloudinary File Attachments:** Visitors and administrators can securely share files (images, documents, etc.) via Cloudinary integration, enhancing support interactions.
*   **Email Notifications:** Administrators receive instant email alerts (via EmailJS) when a new visitor initiates a chat, ensuring prompt responses.
*   **Chat History Persistence:** Client-side chat history is retained locally for a defined period (e.g., 30 minutes) to maintain context during a session.
*   **Responsive Design:** Optimized for a smooth user experience across various devices.

---

## 🚀 Tech Stack

*   **Frontend Language:** Vanilla JavaScript
*   **Real-time Communication:** Socket.IO Client
*   **Email Notifications:** EmailJS
*   **Styling:** Custom CSS (with potential for Tailwind CSS integration, as seen in main portfolio)
*   **Icons:** Lucide Icons

---

## 🔗 Linking to Your Backend Server

This frontend widget requires a compatible backend server to function. The default backend URL is configured within the JavaScript files.

**To connect this frontend to your deployed backend server (e.g., on Render.com):**

1.  **Locate the `SERVER_URL` variable:**
    *   Open `connect/index.html` and `connect/admin.html` in a text editor.
    *   Find the line similar to: `const SERVER_URL = "https://your-backend-server.onrender.com";`
2.  **Update the URL:** Replace `"https://your-backend-server.onrender.com"` with the actual URL of your deployed backend chat server.
    *   Example: `const SERVER_URL = "https://your-actual-chat-server-name.onrender.com";`
3.  **Save and Deploy:** Save the changes to both `index.html` and `admin.html`, then redeploy your frontend application to make the connection live.

**Important Backend Setup (Ensuring Security & Functionality):**

Ensure your backend server (e.g., `abbas-chat-server.onrender.com`) is correctly configured with:

*   **File Upload Endpoint:** An `/upload` endpoint using `multer` and a cloud storage provider (like Cloudinary) to handle file attachments.
*   **Cloudinary Credentials:** `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` must be set as environment variables on your backend deployment.
*   **Server-Side XSS Sanitization:** All incoming text messages must be escaped/sanitized on the server before broadcasting to prevent Cross-Site Scripting.
*   **Secure Admin Authentication:** The admin console's "password" authentication is currently client-side and **highly insecure**. Implement robust SERVER-SIDE authentication for your admin panel.

---

## 🛠 Setup & Usage

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/CodeAbbas/abbas-uddin.git
    cd abbas-uddin
    ```
2.  **Open `connect/index.html`:**
    *   For testing, you can open `connect/index.html` directly in your browser.
    *   For deployment, serve the entire frontend project via a web server (e.g., Nginx, Apache, or a static site host).
3.  **Access Admin Console:**
    *   Open `connect/admin.html` in your browser. You will be prompted for the admin access code to connect.
    *   **(Security Note:** Remember to implement server-side authentication for this page.)

---

## ⚠️ Security Notes & Future Improvements

*   **Admin Authentication:** The current client-side password overlay for `admin.html` is **not secure** and should be replaced with robust server-side authentication (e.g., JWT, session-based login).
*   **Server-Side Validation:** All user input (text messages, file metadata) must be thoroughly validated and sanitized on the backend.
*   **Error Handling:** Enhance client-side error handling for file uploads and network disconnections.
*   **UI/UX for File Uploads:** Add progress indicators, file type/size validation feedback, and attachment previews before sending.
*   **Scalability:** Consider a dedicated database for chat messages for long-term persistence and search, rather than just client-side local storage.

---

Thank you for exploring this real-time customer support widget!
