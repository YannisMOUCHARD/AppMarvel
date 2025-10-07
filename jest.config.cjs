module.exports = {
  testEnvironment: "jsdom", // Use jsdom environment for testing React components
  // Transform jsx files using babel-jest
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx}", // Collect coverage from all js or jsx files in src folder
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testEnvironmentOptions: {
    url: "http://localhost:3000",
  },
};