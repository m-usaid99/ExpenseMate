# ExpenseMate

ExpenseMate is a full-stack personal finance management web application designed to help users track
their income, expenses, and budget efficiently. The app offers an intuitive interface for users to manage their financial
activities, view transaction history, and gain insights into their spending habits through various reports and summaries.

## Features

- **Income and Expense Management**: Record and categorize income and expenses.
- **Category Filtering**: Filter transactions by date, category, and tags.
- **Real-time Summary**: View total income, expenses, and savings in a dashboard overview.
- **Dark/Light Theme Toggle**: Switch between dark and light themes for better usability.
- **Budget Tracking**: Set budgets and monitor spending against those budgets. (In Progress)
- **Responsive Design**: Optimized for both desktop and mobile use. Some pages will be made more responsive soon.

## Tech Stack

- **Frontend**:
  - React
  - Redux
  - React Router
  - MUI (Material UI) & mui-x/charts
  - Axios
- **Backend**
  - Node.js
  - Express
  - Mongoose
- Database
  - MongoDB (deployed on MongoDB atlas)
- Testing
  - Jest
- Documentation
  - Swagger (for API documentation)
- Deployment (CI/CD)
  - Github Actions + Render
  - Vercel

## Usage

You can start using ExpenseMate by visiting the live application:

- **_ExpenseMate_**: [Live App on Vercel](https://expensemate.vercel.app)

### Authentication & Creating an Account

Users can create an account by clicking on the SIGN UP button on the Login page. User will be prompted to enter personal details to create their account.

![Login page](https://i.imgur.com/BJQmpxy.png)

After successful registration, the user will be automatically redirected to the Dashboard.

![Register page](https://i.imgur.com/cRYSdJ9.png)

### Dashboard

The dashboard contains links to specific pages, as well as overall financial summary to understand your financial health at a quick glance.

<a href="https://i.imgur.com/hpojhY4.png" target="_blank">
  <img src="https://i.imgur.com/hpojhY4.png" alt="Screenshot" width="600"/>
</a>

#### Features to be added

- A chart tracking budgets and expenses against those budgets.
- Quick action buttons to add income/expense.

### Expenses

On the expense page, users can see their expense trends for the past 12 months. They can also view a list of their expenses, and filter expenses based on various categories.
Users can also add expenses using the 'Add Expense' button.

![add expense gif](https://i.imgur.com/n9bipL2.gif)

### Income

The Income page works the exact same way as the Expense page. The only difference is that the tags and categories for incomes are different compared to expenses.

### Update User Profile

Users can also change their profile information, as well as the user interface theme. The user profile settings can be accessed through the drop down menu on the top right of the screen.

![dropdown](https://i.imgur.com/U1Qx2xU.png)

The profile update form is very similar to the sign up form. Users will get a notification upon a successful change in the back-end.

![profile](https://i.imgur.com/dZe9rzW.png)

Users can also toggle the theme of the user interface from light to dark. In addition to being stored in the database, this setting is also stored in local storage; so it can be accessed
before a user logs in again.

![darkmode](https://imgur.com/n5QLWpM.gif)

## Local Installation and Setup

### Prerequisites

In order to run the app locally, make sure you have these installed:

1. Node.js
2. npm
3. MongoDB

After this, you can clone the repository to have access to both front-end and back-end source code.

```bash
git clone https://github.com/m-usaid99/ExpenseMate.git
cd ExpenseMate
```

### Frontend Setup

1. Navigate to the front-end directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the `frontend` directory.
   - Create your JWT_SECRET (you can search up how to do so easily on Google).
   - Add the following to your `.env` file.

     ```env
      REACT_APP_API_URL=https://expensematebackend.onrender.com/api
     ```

4. Start the frontend development server:

   ```bash
   npm start
   ```

5. You can view the documentation for the backend API through Swagger by accessing [this link](https://expensemate-bmu7.onrender.com/api-docs/).

### Backend Setup

To do development work on the backend, you will need access to the Sendgrid API as well as MongoDB Atlas. I would recommend getting in touch with me via [email](mailto:rehman.usaid@gmail.com) if you want to
collaborate on the backend API.
