from flask import Flask, request, jsonify
from flask_cors import CORS
import PyPDF2
from llm import summary_model
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=["POST"])
def upload_file():
    print(request.files)
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400
    if file and file.filename.endswith(".pdf"):
        extracted_text = extract_text_from_pdf(file)
        summary_text = summary_model(extracted_text)
        return jsonify({"summary": summary_text}), 200
    return jsonify({"error": "Invalid file type"}), 400


def extract_text_from_pdf(file):
    extracted_text = ""
    pdf_reader = PyPDF2.PdfReader(file)
    for page in range(len(pdf_reader.pages)):
        extracted_text += pdf_reader.pages[page].extract_text()
    return extracted_text


if __name__ == "__main__":
    app.run(debug=True, port=8080, use_reloader=False)
