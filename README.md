# 🍔 Food Delivery App 🚴

**Food Delivery App** is a full-stack MERN application where users can browse food items, place orders, and make payments using Stripe. Admins can manage orders, view delivery statuses, and monitor payments in real time.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js, MongoDB  
- **Payments:** Stripe Integration  
- **Authentication:** JWT-based login system  

> Built to simulate a real-world food ordering platform with a modern UI and secure backend architecture.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Create a `.env` File

In the **root folder**, create a `.env` file and add the following keys:

```env
MONGO_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

> 🔒 These values are private. Contact the repository owner to obtain valid credentials.

### 4. Run the App

```bash
npm run dev
# or
node index.js
```

---
