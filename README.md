# financial-health-sme-ai

Project Description:
----------------------------------------------------------------------

Many small business owners know their daily sales and expenses, but they often don’t have an easy way to judge whether their business is actually doing well financially. Most existing tools are either too complex or require accounting knowledge, which makes them hard to use for SMEs.

In this project, we created a simple web application that helps users understand their financial health in a practical way. The user only needs to upload a CSV file containing basic financial information such as revenue and expenses. Once the file is uploaded, the system analyzes the data and calculates key values like profit and profit margin. Based on these values, the application clearly shows whether the financial condition of the business is Good, Medium, or Poor.

The backend is built using FastAPI, which handles file uploads and financial calculations efficiently. The frontend is developed using React and focuses on simplicity, so users can easily upload files and view results without confusion. The goal of the project is not to replace financial experts, but to give small businesses a quick and understandable snapshot of their financial situation.

This solution helps SMEs save time, avoid manual calculations, and make better decisions by giving them clear insights into their business performance through a user-friendly interface.


Sample inputs:
-----------------------
The application takes CSV files as input. These files represent basic financial data of a business and are used to evaluate its financial health. Each CSV file contains two main columns: revenue and expenses. 

Example CSV format:
----------------------
revenue,expenses
100000,70000
120000,80000

Output
----------------
The system predicts the SME’s financial health:
Good → Profit margin ≥ 25%
Medium → Profit margin ≥ 10% and < 25%
Poor → Profit margin < 10%

Example Output:
-----------------
{
  "financial_health": "Good",
  "profit_margin_percent": 27.27
}


Technologies used:
---------------------------------------------------------------------
Frontend: React.js
Backend: Python,FastAPI,Uvicorn,CSV module

Deployments:
--------------------------------------------------------------------
Backend deployment:
-----------------------
platform: Render
URL: "https://financial-health-sme-ai.onrender.com"

Frontend deployment:
------------------------
platform: Netlify
URL: "https://jolly-croissant-50ffe5.netlify.app/"
