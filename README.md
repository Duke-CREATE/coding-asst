# Brief Description

A coding assistant focused on helping students learn rather than on productivity

# Description

A coding assistant that provides students a step-by-step approach to problems rather than provide code in order to help students learn rather than as a method of saving time

# How To Run

## Set up Environment

- Create a new Python Environment
- Run ```pip install -r requirements.txt```

## Run Backend Server

- The 'backend' folder contains code for an api that takes in a question, runs it through OpenAI, and returns the answer
- Move into the folder and run the command ```uvicorn api:app --reload```
- Once it's up and running, you can run the Streamlit frontend

## Run Streamlit frontend

- The 'frontend_streamlit' folder contains a temporary UI to test out the backend API
- Move into the folder and run the command ```streamlit run edu_st.py```
- The 'dummy.py' file is a test Python file to query the Chatbot from and is fixed for now
- In order to create a new chat, edit the 'edu_st.py' file by modifying the session-id variable in the ```generate_response``` function at the top

### Set up MongoDB Database

- Install MongoDB onto your system following this [link](https://www.youtube.com/watch?v=gB6WLkSrtJk&pp=ygUPaW5zdGFsbCBtb25nb2Ri)
- Create a Database and a collection to store chat sessions
- Modify the connection_url variable in the 'edu_st.py' file to reflect these changes

## Run React frontend

- The 'frontend_react' folder contains code for the main UI for the Coding Assistant and will be the final UI (it isn't connected to the backend at the moment)
- Install Node onto your syste following this [link](https://www.youtube.com/watch?v=06X51c6WHsQ&pp=ygUMaW5zdGFsbCBub2Rl)
- Move into the folder and run the following:
    - ```npm install```
    - ```npm start```
- Wait for the 'Loading' text on the page to change to 'Ready!'
- You can then write and execute standard Python code
