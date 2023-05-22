# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Overview

I have developed a dynamic storefront application utilizing fake data from this [API](https://fakestoreapi.com/). The application allows users to browse and search for products by category, narrowing down the displayed results. The available categories are listed within the input label.

## Background

To initiate the project, I utilized create-react-app for streamlined bootstrapping, and then expanded on it with my custom functionality. In order to enforce data integrity and facilitate error handling, I integrated TypeScript to validate the shape of incoming responses.

## Technical Considerations

My main objective was to find a suitable API that offered a concise selection of product data, ensuring simplicity and ease of implementation. This project aimed to serve as a proof of concept, resembling a real work scenario while maintaining fundamental functionality without unnecessary complexities.

## Challenges

One notable challenge I encountered was the inconsistent formatting of prices retrieved from the API. I successfully addressed this issue by leveraging the Intl.NumberFormat() method, which not only resolved the formatting discrepancies but also ensured a more robust and reliable approach to displaying currency values.

Another hurdle I faced was determining the desired design aesthetic for the storefront. To overcome this, I drew inspiration from Mejuri and even sought assistance from ChatGPT to identify comparable Google fonts.

## Reflections

Given additional time, there are several enhancements I would have implemented. Firstly, I would have focused on bolstering error handling and implementing comprehensive form validation. Although the API did not support searching by product name, I would have explored alternative options or developed custom functionality to accommodate this feature, eventually contributing it as a pull request.

Furthermore, I would have dedicated more time to refine the design, introducing interactive elements such as displaying product descriptions upon clicking on a specific item. Additionally, considering the potential future requirements, I would have evaluated and integrated an appropriate state management system.

To enhance code reusability and maintain a modular structure, I would have extracted the API calls within `App.tsx` into separate utility functions, ensuring they are easily reusable and not tied to specific implementations.

Lastly, I would have implemented test cases to cover base and edge scenarios, ensuring the application's stability and reliability.

By addressing these areas, I believe the storefront application would exhibit enhanced functionality, usability, and maintainability, aligning with best practices in front-end development.
