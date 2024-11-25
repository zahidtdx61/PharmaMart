# PharmaMart

**PharmaMart** is a modern multi-vendor e-commerce platform for medicine and healthcare products. The platform enables vendors to list their products and customers to purchase medicines, vitamins, supplements, and other health essentials conveniently. PharmaMart focuses on trust, quality, and seamless user experience to make online healthcare accessible for everyone.

## 🖥️ Live Demo

Explore the website: [PharmaMart](https://pharma-mart.vercel.app)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fpharma-mart.vercel.app%2F)](https://pharma-mart.vercel.app/)

---

## 🚀 Features

### For Customers:

- **Browse Medicines**: Explore medicines by categories like Pain Relief, Antibiotics, Vitamins, etc.
- **Search & Filter**: Easily find medicines by name, category, or type.
- **Product Details**: View detailed information, including price, discounts, expiry date, and more.
- **Secure Checkout**: Place orders with a simple, secure payment process through stripe.

### For Vendors:

- **Multi-Vendor Platform**: Register and list your medicines effortlessly.
- **Inventory Management**: Update stock, prices, and product details.
- **Sales Dashboard**: Track orders and manage transactions.

### General Features:

- **Responsive Design**: Optimized for all devices, including desktops, tablets, and smartphones.
- **User Authentication**: Secure login for customers and vendors.
- **Real-Time Notifications**: Alerts for low stock, order status updates, and promotions.
- **Admin Panel**: Manage users, products, and transactions effectively.

---

## ⚙️ Technologies Used

- **Frontend**: React.js, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **PaymentGateway**: Stripe
- **Authentication**: Firebase auth, JWT (JSON Web Token)
- **Hosting**: Vercel

---

## 🛠️ Installation Instructions

### Prerequisites:

- Node.js
- MongoDB

### Steps:

To run the website locally, follow these steps:

1. Clone the repository:

```sh
git clone https://github.com/zahidtdx61/PharmaMart.git
```

2. Navigate to the client directory:

```sh
cd PharmaMart/client
```

3. Install dependencies:

```sh
npm install
```

4. Make an .env file and add these credentials:

```env
VITE_apiKey=<get_this_from_firebase>
VITE_authDomain=<get_this_from_firebase>
VITE_projectId=<get_this_from_firebase>
VITE_storageBucket=<get_this_from_firebase>
VITE_messagingSenderId=<get_this_from_firebase>
VITE_appId=<get_this_from_firebase>
VITE_IMGBB_API_KEY=<get_this_from_imgbb>
VITE_Bytescale_accountId=<get_this_from_bytescale>
VITE_Bytescale_apiKey=<get_this_from_bytescale>
VITE_STRIPE_PUBLISHABLE_KEY=<get_this_from_stripe>
VITE_API_URL=<add_you_backend_api_address>
```

5. Start the development client server:

```sh
npm run dev
```

6. Navigate to server directory

```sh
cd ../server
```

7. Install dependencies:

```sh
npm install
```

8. Make an .env file and add these credentials:

```env
PORT=<any_port_your_choice>
MONGO_URL=<get_this_from_mongoDB>
MONGO_DB_NAME=<any_name_of_your_choice>
ACCESS_TOKEN_SECRET=<secret_key>
STRIPE_SECRET_KEY=<get_this_from_stripe>
YOUR_DOMAIN=<domain_name>
```

9. Start the development backend server:

```sh
npm run dev
```

---

## Contribution

We welcome contributions from the community to enhance and improve Buzz Forums.
