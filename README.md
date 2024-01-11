# youtube-skeleton

I created a web application that attempts to mirror the functionality of YouTube.

This application has three parts that all work together to create functionality.
1. **video-processing-service**
2. **yt-api**
3. **yt-web-client**


## video-processing-service

This **video-processing-service** (VPS) takes a video file, downgrades the resolution to 360p, creates a document in Firestore that contains metadata about the video, and then processes the video.

How it works:
1. The service recieves a post request that contains data.name which should be the name of a video uploaded to a Google Cloud Storage bucket called raw-videos-bucket
2. It downloads the video from the bucket and creates a document in Firestore that includes metadata and field called status equal to "processing"
3. Then it uses FFmpeg to convert the video resolution to 360p and uploads the processed video into the Google Cloud Storage bucket called processed-videos-bucket
4. Finally, it changes the status to "processed" in the Firestore document and returns a 200 response.

This VPS was containerized using Docker and Google Cloud Build and was hosted on Google Cloud Run. I then created a Google Cloud Pub/Sub that would send the VPS a post request with the name of the file uploaded to the raw-videos-bucket. Now, anytime a video was uploaded to the raw-videos-bucket it would automatically be processed and uploaded into the processed-videos-bucket.


## yt-api

The yt-api is effectively the **serverless backend** of the project since it was built using just **three** Firebase Cloud Functions.

1. **CreateUser**
    * This function will create document in Firestore for each user when they sign in with Google through Firebase Authentication. (I did this to get the profile picture of each user.)

2. **generateUploadUrl**
    * This function will generate and respond with a signed URL to the raw-videos-bucket whenever it is called by an authenticated user.

3. **getVideos**
    * This function will return the 10 most recent documents from the videos collection in Firestore.


## yt-web-client

The yt-web-client is the **front end** of the project.

Functionality:
1. **Authentication**
    * users can sign-in using the Google provider from Firebase Authentication
2. **Watching Videos**
    * The root page displays up to 10 videos from the processed-videos-bucket. When the user clicks on a video, they will be redirected to the watch page for that specific video.

3. **Uploading Videos**
    * When an authenticated user clicks the upload button and selects a file it will call the uploadVideo function. This function will first get a response that contains signed URL from the generateUploadUrl function. Then, it will use the Fetch API to make a PUT request (PUT requests are used to upload objects to Google Cloud Storage buckets) to that URL and upload the video file to the raw-videos-bucket.
    




