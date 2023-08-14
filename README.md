# Flipkart Scraper Express App

This is a simple Express.js application that scrapes product information from Flipkart URLs.

## Introduction

The Flipkart Scraper Express App allows you to provide Flipkart product URLs and retrieve essential information such as title, price, description, reviews, and ratings.

## Features

- Scrapes product information from Flipkart URLs.
- Saves scraped data to a MongoDB database.
- Provides an API for scraping and retrieving product details.

## Getting Started

### Prerequisites

- Node.js and npm installed on your system.
- MongoDB database connection.

### Installation

1. Clone this repository: `git clone https://github.com/Arpit-Mohapatra/flipkart-scraper.git`
2. Navigate to the project directory: `cd flipkart-scraper`
3. Install dependencies: `npm install`

### Configuration

Create a `.env` file in the root directory of the app with the following content:

```plaintext
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PORT=port no.(optional)
