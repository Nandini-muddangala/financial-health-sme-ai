from fastapi import FastAPI, UploadFile, File
import pandas as pd

app = FastAPI(
    title="SME Financial Health API",
    version="0.1.0"
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/upload-financials")
async def upload_financials(file: UploadFile = File(...)):
    df = pd.read_csv(file.file)

    total_revenue = df["revenue"].sum()
    total_expenses = df["expenses"].sum()
    profit = total_revenue - total_expenses
    profit_margin = (profit / total_revenue) * 100 if total_revenue else 0

    risk = "Low"
    if profit_margin < 10:
        risk = "High"

    insights = {
        "total_revenue": total_revenue,
        "total_expenses": total_expenses,
        "profit": profit,
        "profit_margin_percent": round(profit_margin, 2),
        "risk_level": risk,
        "recommendation": "Reduce operating costs and improve collections"
        if risk == "High"
        else "Financial position is healthy"
    }

    return insights