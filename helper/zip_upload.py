import firebase_admin
from firebase_admin import credentials, storage
import os

# Initialize Firebase Admin SDK
def initialize_firebase():
    # Replace with the path to your Firebase service account JSON key
    cred = credentials.Certificate("firebase/prompt-flow-d8fdf-firebase-adminsdk-t15vf-9742ab55d5.json")
    
    # Replace with your Firebase storage bucket URL (e.g., 'your-project-id.appspot.com')
    firebase_admin.initialize_app(cred, {'storageBucket': 'prompt-flow-d8fdf.appspot.com'})

# Function to upload ZIP file to Firebase Storage
def upload_zip_to_firebase(local_zip_path, firebase_storage_path):
    try:
        # Get a reference to the storage bucket
        bucket = storage.bucket()
        
        # Create a blob (the file object in Firebase Storage)
        blob = bucket.blob(firebase_storage_path)
        
        # Upload the file to the blob
        blob.upload_from_filename(local_zip_path)
        
        # Make the file publicly accessible (optional)
        blob.make_public()
        
        # Print the public URL (if made public)
        print(f"File uploaded successfully. Public URL: {blob.public_url}")
    except Exception as e:
        print(f"Error uploading file: {e}")

if __name__ == "__main__":
    # Initialize Firebase app
    initialize_firebase()
    
    # Local path of the ZIP file to upload
    local_zip_file = 'IMT2022075_lab9.zip'
    
    # Path in Firebase Storage (where you want to upload)
    firebase_storage_path = 'uploads/my_zip_file.zip'
    
    # Upload the ZIP file
    upload_zip_to_firebase(local_zip_file, firebase_storage_path)
