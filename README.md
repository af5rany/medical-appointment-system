# Medical Appointment System

This project is a web-based application designed to manage medical appointments. It is built using modern technologies such as React, Vite, Firebase, Airtable, and Tailwind CSS.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [Building for Production](#building-for-production)
- [Linting](#linting)
- [Additional Configuration](#additional-configuration)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd medical-appointment-system
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   Or, if you prefer using yarn:
   ```bash
   yarn install
   ```

## Environment Variables

This project requires several environment variables for configuration. These variables should be stored in a `.env` file in the root directory of the project.

### Required Environment Variables

- **Firebase Configuration**:

  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
  - `VITE_FIREBASE_MEASUREMENT_ID`

- **Google OAuth Client ID**:

  - `VITE_GOOGLE_CLIENT_ID`

- **Airtable API Configuration**:
  - `VITE_AIRTABLE_API_KEY`
  - `VITE_AIRTABLE_BASE_ID`

### Generating Firebase Environment Variables

To generate the Firebase environment variables, follow these steps:

1. **Create a Firebase Project**:

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Click on "Add Project" and follow the setup instructions.

2. **Enable Firebase Services**:

   - Enable the necessary services such as Authentication, Firestore, and Storage as required by your project.

3. **Obtain Firebase Configuration**:
   - In your Firebase project dashboard, click on the gear icon next to "Project Overview" and select "Project Settings".
   - Scroll down to "Your apps" and click on the `</>` icon to create a new web app.
   - After creating the app, you will see the Firebase configuration object. Use this information to populate the Firebase environment variables.

### Generating Google OAuth Client ID

To generate the Google OAuth Client ID, follow these steps:

1. **Create a Google Cloud Project**:

   - Go to the [Google Cloud Console](https://console.cloud.google.com/).
   - Create a new project.

2. **Enable OAuth Consent Screen**:

   - Under "APIs & Services," navigate to "OAuth consent screen."
   - Configure the consent screen by providing the necessary details.

3. **Create OAuth 2.0 Client ID**:
   - Under "APIs & Services," navigate to "Credentials."
   - Click "Create Credentials" and select "OAuth 2.0 Client ID."
   - Choose "Web application" and configure the authorized URIs.
   - After creation, you will receive a `Client ID`. Use this to set the `VITE_GOOGLE_CLIENT_ID` environment variable.

### Generating Airtable API Key and Base ID

To generate the Airtable API Key and Base ID, follow these steps:

1. **Sign up for Airtable**:

   - Go to the [Airtable website](https://airtable.com/) and sign up for an account.

2. **Create a Base**:

   - Create a new base in Airtable and configure the tables and fields as required by your project.

3. **Obtain Airtable API Key**:

   - Go to your Airtable account settings and generate an API key.

4. **Obtain Airtable Base ID**:
   - Visit the [Airtable API documentation](https://airtable.com/api) while logged in.
   - Select your base, and the Base ID will be displayed in the introduction section.

## Running the Project

Once the environment variables are set up, you can run the development server using:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The application will start, and you can access it at:  
 ➜ **Local**: [http://localhost:5173/](http://localhost:5173/)

## Building for Production

To create a production build of the project, run:

```bash
npm run build
```

Or with yarn:

```bash
yarn build
```

The production files will be generated in the `dist` directory.

## Linting

To ensure code quality and consistency, you can run the linter with:

```bash
npm run lint
```

Or with yarn:

```bash
yarn lint
```

## Additional Configuration

- **Tailwind CSS**: The project uses Tailwind CSS for styling. You can customize the styles in the `tailwind.config.js` file.
- **Firebase Configuration**: The Firebase settings are configured using environment variables. Ensure you have the correct Firebase credentials set in the `.env` file.
- **Airtable Integration**: The project integrates with Airtable using the provided API key and base ID. Ensure these are correctly set in the `.env` file.

## Troubleshooting

- **Missing Dependencies**: If you encounter issues related to missing dependencies, try deleting the `node_modules` directory and the `package-lock.json` or `yarn.lock` file, then reinstall the dependencies.

  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

- **Environment Variables**: Double-check that your `.env` file contains all necessary variables and that they are correctly spelled.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
