# SMART CALENDER APP MADE USING SUPABASE, LITELLM, FLASK AND REACT

Technologies Used

Supabase: For database and authentication.
Flask: As the backend framework.
LLM (Large Language Model): LITELLM->OPENAI GPT 4
React: For the frontend user interface.

Prerequisites

List any prerequisites that need to be installed before setting up the project:
Python
Node.js
Supabase account
Google Cloud account
OPENAI API Keys

## PDF READER MODULE -> BACKEND IN FLASK AND LLM WRAPPER USED FOR SUMMARY GENERATION

1. Store your API Keys in the .env file

2. The backend server -> app.py

## Introduction

The PDF Summarizer API provides a convenient way to extract text from PDF files and generate concise summaries using an LLM. This can be useful for quickly understanding the main points of lengthy documents or research papers.

## Installation

- **Clone the repository:**
  git clone <repository-url>
  cd <repository-directory>
- python -m venv venv
  source venv/bin/activate # On Windows: venv\Scripts\activate
- pip install -r requirements.txt
- flask run

## API Endpoints

POST /upload
Uploads a PDF file and generates a summary using an LLM.
Request:
Content-Type: multipart/form-data
Body:
file: The PDF file to be uploaded.
Response:
Content-Type: application/json
Body:
json
{
"summary": "The generated summary of the PDF content."
}

## Error Responses:

400 Bad Request:
json
{
"error": "No file part"
}

400 Bad Request:
json
{
"error": "No selected file"
}

400 Bad Request:
json
{
"error": "Invalid file type"
}

## src module -> front end code and react components integrated with Supabase

1. make sure to have a supabase account and gcloud account for login

2. we will be utilizing the google calender api for the task

## app.js -> app logic and supabase integration

## Calendar Event Creator

This React application allows users to upload PDF files, extract summaries, and create calendar events in Google Calendar using the extracted text. It leverages Supabase for authentication and Google Calendar API for event management.

## Introduction

The Calendar Event Creator app enables users to sign in with Google, upload PDF files, and create calendar events based on the summaries extracted from those files. This is particularly useful for users who want to quickly summarize documents and schedule meetings based on their content.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **Google Calendar API**: For creating and managing calendar events.
- **react-datetime-picker**: A React component for selecting date and time.

## dependancies

npm install

## running the application:

npm start

runs the application in local host port 3000.Given that we have enabled CORS the backend will be able to recognise the endpoint.

## Usage:

Sign In: Click the "Sign in with Google" button to authenticate using your Google account.
Upload PDF: Use the file upload component to upload a PDF file. The app will extract the text and generate a summary.
Set Event Details: Choose the start and end time for the event using the date-time picker.
Enter a name for the event.
The summary description will be automatically populated from the extracted text.
Create Calendar Event: Click the "Calendar" button to create an event in your Google Calendar.
Sign Out: Click the "Sign Out" button to log out of your Google account.

## API Integration

The app integrates with the Google Calendar API to create events. Ensure that you have enabled the Google Calendar API in your Google Cloud Console and have the necessary credentials set up.

## file upload.js -> used to fetch the backend api and ingest the pdf

# FileUpload Component

The `FileUpload` component allows users to upload PDF files and receive a summary of the content extracted from those files. It interacts with a backend API to handle file uploads and summary generation.

## Introduction

The `FileUpload` component is designed to facilitate the uploading of PDF files. Upon uploading, it sends the file to a backend server, which processes the file and returns a summary of its contents.

## Functionality

- **File Selection**: Users can select a PDF file using an input field.
- **File Upload**: The selected file is uploaded to the backend API when the "Upload PDF" button is clicked.
- **Summary Generation**: The component displays a message when the summary is successfully generated.
- **Error Handling**: Displays error messages if the upload fails or if no file is selected.

### to use the functionality of fileupload:

Include in Your JSX:

function App() {
return (

<div>
<FileUpload />
</div>
);
}

NOTE: Backend API: Ensure that your backend server is running and accessible at http://localhost:8080/upload for file uploads.

Video Explanation:https://share.vidyard.com/watch/fwbsp3Q8fWkT9HPNwf2bEA?
