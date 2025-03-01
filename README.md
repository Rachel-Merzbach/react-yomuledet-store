# react-yomuledet-store
A store for birthday products with a manager interface.

## About the Project
This is a website for selling products and accessories for birthdays. It includes a shopping cart system, user authentication, and an admin panel for managing products and discounts.

## Login & Registration
- Users can register only as regular users, not as administrators.
- A predefined administrator account is available:
  - **Email:** manager@gmail.com
  - **Password:** Manager1121
- Users can log in or register but cannot register twice with the same email address.

## Guest User
- A guest (unregistered user) can browse the products but **cannot** add products to the cart.

## Registered User Features
- Update personal details
- Add products to the cart
- Log out

## Manager Features
- Add/remove products from the catalog
- Add/remove discounts for products
- Log out

## Shopping Cart
- Users can remove individual products from the cart or clear the entire cart.
- After a successful PayPal payment, the cart is automatically cleared.

## Home Page Features
- A link to the store's location on **Google Maps**
- A phone contact link via **Skype**
- An option to send an email using **Gmail**

## Resources Used
- **Images:** Sourced from [Freepik](https://www.freepik.com/)
- **Font:** [Varela Round](https://fonts.google.com/specimen/Varela+Round)
- **Payment Gateway:** [PayPal](https://paypal.com) for secure transactions
