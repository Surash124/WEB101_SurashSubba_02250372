# Weather API Dashboard

## 1. User Documentation

### Overview
The Weather API Dashboard is a simple web application that demonstrates how to use RESTful API operations (GET, POST, PUT, DELETE) in a practical project. It allows users to fetch live weather data, save locations, update saved entries, and delete them — all from a clean, tabbed interface.

### Key Features
- **GET Weather Data**: Enter a city name and retrieve current weather information (temperature, humidity, wind speed, and conditions) using the OpenWeatherMap API.
- **POST Location**: Save a location with custom notes to a placeholder API (JSONPlaceholder). This simulates storing data in a backend.
- **PUT Update Location**: Edit details of a saved location using an inline modal form and update the entry.
- **DELETE Location**: Remove a saved location permanently from the list.
- **Tabbed Interface**: Easy navigation between GET, POST, Saved Locations, and API Info sections.

---

## 2. Technical Documentation

### Technologies Used
- **Frontend**: HTML, CSS, JavaScript (Vanilla JS)
- **Backend**: JSONPlaceholder (simulated REST API service)
- **Database**: None (data persistence simulated via JSONPlaceholder and local array)

### API Endpoints
| Endpoint | Method | Purpose | Auth Required |
|----------|--------|---------|---------------|
| `https://api.openweathermap.org/data/2.5/weather` | GET | Fetch current weather data | Yes (API Key) |
| `https://jsonplaceholder.typicode.com/posts` | POST | Save a new location | No |
| `https://jsonplaceholder.typicode.com/posts/:id` | PUT | Update an existing location | No |
| `https://jsonplaceholder.typicode.com/posts/:id` | DELETE | Delete a saved location | No |

### Code Structure
- **index.html**: Provides the UI structure, tabbed navigation, forms, and modal.
- **script.js**: Contains all JavaScript logic for handling API requests, event listeners, and rendering results.
- **Key Components**:
  - Tab navigation logic
  - Weather fetch function (GET)
  - Save location function (POST)
  - Edit/update function (PUT)
  - Delete function (DELETE)
  - Response info display for debugging

---

## 3. Deployment Guide

### Deployment Steps
1. **Create Project Folder**  
   Name the folder `WeatherAPI-Dashboard` and place `index.html` and `script.js` inside.
2. **Insert API Key**  
   Replace `YOUR_OPENWEATHERMAP_API_KEY` in `script.js` with your actual OpenWeatherMap API key.
3. **Run Application**  
   Open `index.html` in any modern web browser. No server setup is required.

### Environment Variables
| Variable | Purpose | Example |
|----------|---------|---------|
| `API_KEY` | Required for OpenWeatherMap API requests | `abc123xyz` |

---

## Notes
- This project is designed for **academic demonstration** of RESTful APIs.  
- JSONPlaceholder is used as a mock backend, so saved data is not permanent.  
- The application is lightweight and runs entirely in the browser.  

