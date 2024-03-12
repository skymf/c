import os
import pandas as pd
from zipfile import ZipFile
import io
import json
import yt_dlp
import firebase_admin
from firebase_admin import credentials, storage
import uuid
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)


cred = credentials.Certificate("./no/sak.json")
firebase_admin.initialize_app(cred, {
    'storageBucket': 'website-client-1adc5.appspot.com'
})
bucket = storage.bucket()

def read_csv_files_from_zip(zip_path):
    dataframes = {}
    with ZipFile(zip_path, 'r') as zip_file:
        for entry in zip_file.namelist():
            if entry.endswith('.csv'):
                with zip_file.open(entry) as file:
                    content = file.read()
                    if not content:
                        print(f"Skipped empty file: {entry}")
                        continue
                    try:
                        df = pd.read_csv(io.BytesIO(content), encoding='utf-8', engine='python', header=0)
                        print(f"DataFrame from {entry}: \n{df.head()}")
                        dataframes[os.path.basename(entry)] = df
                    except Exception as e:
                        print(f"Error reading {entry}: {str(e)}")
    return dataframes

def calculate_additional_columns(dataframes_dict, video_duration):
    for key, df in dataframes_dict.items():

        if 'Started watching' in df.columns and 'Stopped watching' in df.columns and 'Number of times each moment was seen' in df.columns:

            total_viewers = df['Stopped watching'].sum()
            df['Absolute Audience Retention (%)'] = (df['Number of times each moment was seen'] / total_viewers) * 100
            df['Time position'] = df['Video position (%)'] / 99 * video_duration
            df['People remaining'] = df['Stopped watching'][::-1].cumsum()[::-1]
            df['Stopped watching relative'] = df['Stopped watching'] / df['People remaining']

            dataframes_dict[key] = df

    return dataframes_dict

def create_graphs(dataframes, video_url, session_id):
    graphs = {}
    for filename, df in dataframes.items():
        print(f"Columns in {filename}: {df.columns}")
        if 'Video position (%)' in df.columns and 'Duration' not in df.columns:
            try:
                ydl = yt_dlp.YoutubeDL({'quiet': True})
                video_info = ydl.extract_info(video_url, download=False)
                duration_seconds = video_info.get('duration')

                if duration_seconds is not None:
                    duration_minutes = duration_seconds / 60
                    total_rows = len(df)
                    df['Video position (%)'] = ((df.index + 1) / total_rows) * duration_minutes
                    df['Video position (%)'] = df['Video position (%)'].round(2)
            except Exception as e:
                print(f"Error updating 'Video position (%)': {str(e)}")

        json_data = df.to_json(orient='records')
        json_filename = f'{filename}_{session_id}_graph.json'

        local_json_path = f'./public/json/{filename}_{session_id}_graph.json'
        with open(local_json_path, 'w') as json_file:
            if json_data != '[]':
                json_file.write(json_data)
            else:
                print(f'No data to write in {local_json_path}')

        blob = bucket.blob(json_filename)
        blob.upload_from_filename(local_json_path)
        print(f"Uploaded {json_filename} to Firebase Storage")

    return graphs

@app.route('/api/python', methods=['POST', 'GET'])
def get_graphs():
    if request.method == 'POST':
        try:
            zip_path = request.files['zipFile']
            video_url = request.form.get('videoUrl')

            # Generate a session ID using UUID
            session_id = str(uuid.uuid4())  # Convert UUID object to string

            print(f"Received file: {zip_path.filename}, Video URL: {video_url}, Session ID: {session_id}")

            dataframes = read_csv_files_from_zip(zip_path)
            if not dataframes:
                return jsonify({'error': 'No valid CSV files found in the ZIP'}), 400

            ydl = yt_dlp.YoutubeDL({'quiet': True})
            video_info = ydl.extract_info(video_url, download=False)
            video_duration = video_info.get('duration') / 60 if video_info.get('duration') is not None else 0

            dataframes = calculate_additional_columns(dataframes, video_duration)

            graphs = create_graphs(dataframes, video_url, session_id)
            # Return graphs data along with session ID upon successful processing
            return jsonify({'message': 'Graphs generated and saved to Firebase Storage', 'session_id': session_id}), 200
        except Exception as e:
            error_message = str(e)
            print(f"An error occurred: {error_message}")
            return jsonify({'error': error_message}), 500
    elif request.method == 'GET':
        return "Get request received. Use POST to upload a file. Server is online."

if __name__ == "__main__":
    app.run(debug=True)
