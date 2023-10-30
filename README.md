# React + TypeScript + Vite Weather Forecast App

## Getting Started

To initialize the project after cloning it, Navigate to the project directory:

`cd weather-app`

Install project dependencies:

`yarn` or `npm install`

## Running the Application

To run the application in development mode, use the following command:

`yarn dev` or `npm run dev`

This will start the development server, and the application will be available in your browser at http://localhost:5173/.

## Building the Application

To build the application for production, use the following command:

`yarn build` or `npm run build`

This will create an optimized, production-ready build in the dist directory.

## Extending the Application

You can extend this application by following Domain Driven Design rules. Here are some basic steps to get you started:

1. Create New Components: You can create new components in the src/modules directory (think of it as a separate domain).

2. Define Routes: If you want to add new pages to your application, configure them in the src/routes file. You can use React Router to handle routing.

3. State Management: If your application requires state management, consider using libraries like Redux or Mobx. Set up the store and actions as needed.

4. Styling: You can create and import scss file in every component.

5. API Integration: To fetch data from an API, you can use libraries like Axios or the built-in fetch API. Create adapters directory for making API calls.

6. Testing: Set up vitest and write unit tests for your components and features using React Testing Library.

7. Documentation: Keep your codebase well-documented using comments and documentation tools like JSDoc.
