import os
import streamlit as st
from html_chatbot_template import css, bot_template, user_template
import subprocess
import shlex
import requests
from langchain.memory import MongoDBChatMessageHistory


# Global variables
current_directory = os.getcwd()
selected_file_path = ""
current_file_content = ""


def generate_response(question):
    """
    Function to generate a response for the user query using the chat model

    Args:
        question (str): The user query

    Returns:
        response (str): The response from the chat model
    """

    url = "http://127.0.0.1:8000"

    session_id = "new-session"

    response = requests.get(f"{url}/answer", params=
                        {"query": question, "session_id": session_id}
                        ).json()['response']
    
    conn_string = "mongodb://localhost:27017/edu_pilot.chat_history"

    message_history = MongoDBChatMessageHistory(
    connection_string=conn_string, session_id = session_id
    )

    for i, message in enumerate(message_history.messages):
        # Check if the message is from the user or the chatbot
        if i % 2 == 0:
            # User message
            st.write(user_template.replace(
                "{{MSG}}", message.content), unsafe_allow_html=True)
        else:
            # Chatbot message
            st.write(bot_template.replace(
                "{{MSG}}", message.content), unsafe_allow_html=True)

    # Get the response from the chat model for the user query
    # response = st.session_state.conversations({'question': question})

    # # Update the chat history
    # st.session_state.chat_history = response['chat_history']

    # st.write(response['chat_history'])

    # # Add the response to the UI
    # for i, message in enumerate(st.session_state.chat_history):
    #     # Check if the message is from the user or the chatbot
    #     if i % 2 == 0:
    #         # User message
    #         st.write(user_template.replace(
    #             "{{MSG}}", message.content), unsafe_allow_html=True)
    #     else:
    #         # Chatbot message
    #         st.write(bot_template.replace(
    #             "{{MSG}}", message.content), unsafe_allow_html=True)

# Function to load file content
def load_file_content(file_path):
    with open(file_path, "r") as file:
        content = file.read()
    return content

# Function to save file content
def save_file_content(file_path, content):
    with open(file_path, "w") as file:
        file.write(content)

# UI
st.set_page_config(page_title="Eve", layout="wide")

st.title("Eve")

# Sidebar for File selection
st.sidebar.header("File Options")
selected_file = st.sidebar.file_uploader("Select a file", type=["txt", "md", "py", "ipynb"])

# Display files in the current directory
st.sidebar.text("Files in Directory:")
files = os.listdir(current_directory)
selected_file_name = st.sidebar.selectbox("Select a file", files, key="file_selector")

# Display file content
if selected_file_name:
    selected_file_path = os.path.join(current_directory, selected_file_name)
    current_file_content = load_file_content(selected_file_path)

new_file_name = st.sidebar.text_input("New File Name:")
if st.sidebar.button("Create New File"):
    if new_file_name:
        new_file_path = os.path.join(current_directory, new_file_name)
        with open(new_file_path, "w") as new_file:
            new_file.write("")
        st.success(f"File '{new_file_name}' created in {current_directory}")
        current_file_content = load_file_content(new_file_path)

if selected_file:
    selected_file_name = selected_file.name
    current_file_content = selected_file.read().decode("utf-8")

code, bot = st.columns(2)

with code:

    with st.expander(f"{selected_file_name}", expanded=True):
        st.markdown(f'<style>textarea{{width: 100%;}}</style>', unsafe_allow_html=True)
        updated_content = st.text_area("", current_file_content, height = 600)

    # Save button
    col1, col2 = st.columns(2)
    if col1.button("Save File"):
        if selected_file_path:
            save_file_content(selected_file_path, updated_content)
            st.success(f"File '{selected_file_name}' saved successfully.")
            current_file_content = load_file_content(selected_file_path)
        else:
            st.warning("Please select a file before saving.")

    # Add your custom button next to the "Save File" button in col2
    if col2.button("Run Code"):
        current_file_content = load_file_content(selected_file_path)
        # Add the functionality for your custom button here
        print(selected_file_path)
        command = ["python", (selected_file_path)]
        print(command)

        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
        output, error = process.communicate()
        print(output.decode("utf-8"))
        print(error.decode("utf-8"))

        with st.expander(f"Output", expanded=True):
            st.markdown(f'<style>textarea{{width: 100%;}}</style>', unsafe_allow_html=True)
            if output:
                code_output = st.text_area("", output.decode("utf-8"), height = 200)
            else:
                code_output = st.text_area("", error.decode("utf-8"), height = 200)
            
with bot:
    st.write(css, unsafe_allow_html=True)

    if "conversations" not in st.session_state:
        st.session_state.conversations = None
    if "chat_history" not in st.session_state:
        st.session_state.chat_history = None

    user_question = st.text_input("Upload your data and ask me anything?")

    # Check if the user has entered a query/prompt
    if user_question:
        # Call the function to generate the response
        generate_response(user_question)