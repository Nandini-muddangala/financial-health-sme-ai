from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import csv
import io

app = FastAPI(title="SME Financial Health Predictor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "API running. Upload CSV to /upload-financials"}

@app.post("/upload-financials")
async def upload_financials(file: UploadFile = File(...)):
    if not file.filename.endswith(".csv"):
        raise HTTPException(status_code=400, detail="Upload a valid CSV file")

    try:
        contents = await file.read()
        decoded = contents.decode("utf-8")
        reader = csv.DictReader(io.StringIO(decoded))

        total_revenue = 0
        total_expenses = 0

        for row in reader:
            total_revenue += float(row["revenue"])
            total_expenses += float(row["expenses"])

        if total_revenue == 0:
            raise HTTPException(status_code=400, detail="Revenue cannot be zero")

        profit = total_revenue - total_expenses
        profit_margin = (profit / total_revenue) * 100

        if profit_margin >= 25:
            health = "Good"
        elif profit_margin >= 10:
            health = "Medium"
        else:
            health = "Poor"

        return {
            "financial_health": health,
            "profit_margin_percent": round(profit_margin, 2)
        }

    except KeyError:
        raise HTTPException(
            status_code=400,
            detail="CSV must contain 'revenue' and 'expenses' columns"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))