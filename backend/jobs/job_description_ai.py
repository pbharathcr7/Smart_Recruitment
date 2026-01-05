from dotenv import load_dotenv
from langchain_google_genai import GoogleGenerativeAI
from datetime import datetime, timedelta
import json
import os

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
model = GoogleGenerativeAI(model="gemini-2.5-flash", google_api_key=api_key)

today_date = datetime.now()
deadline_date = today_date + timedelta(days=7)
formatted_deadline = deadline_date.strftime("%d/%m/%Y")

def generate_job_description(msg):
    prompt = (
        f"Generate a job description for the following in JSON format only. "
        f"Job Title, Job Description, Department, Job Location, Employment Type, Salary Range (starting with 'RS'), "
        f"Application Deadline (use {formatted_deadline} in DD/MM/YYYY format), Required Qualifications, Preferred Qualifications, Responsibilities. "
        f"Do not include json word at beginning.\n"
        f"Job Title: {msg}"
    )
    try:
        result = model.invoke(prompt)
        # Try to extract JSON from the result
        import re
        match = re.search(r'\{.*\}', str(result).replace('\n', ''))
        if match:
            return json.loads(match.group())
        else:
            return {"error": "No JSON found in model output."}
    except Exception as e:
        return {"error": f"Failed to generate job description: {str(e)}"}