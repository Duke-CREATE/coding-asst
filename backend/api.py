from enum import Enum
from typing import List
from fastapi import FastAPI, Query
from pydantic import BaseModel
import json
import os

from langchain.schema import (
    SystemMessage,
    HumanMessage,
    AIMessage
)

from langchain.memory import MongoDBChatMessageHistory

from utils import (augment_prompt, get_response)

from langchain.document_loaders.directory import DirectoryLoader
from langchain.document_loaders import PythonLoader

from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter
from langchain.vectorstores import Chroma

from langchain.chat_models import ChatOpenAI

app = FastAPI()

@app.get("/list_test/")
def repeat_list(history: List[str] = Query([])):
    return {"history": history}

@app.get("/answer")
def get_answer(query: str, session_id: str):
    with open('../secret.json', 'r') as json_file:
        key = json.load(json_file)['org-key']

    os.environ["OPENAI_API_KEY"] = key

    chat = ChatOpenAI(
    openai_api_key=os.environ["OPENAI_API_KEY"],
    model='gpt-4'
    )

    response = "bleh"

    loader = DirectoryLoader('../python_files', glob="**/*.py", loader_cls=PythonLoader)

    docs = loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=0)
    documents = text_splitter.split_documents(docs)
    db = Chroma.from_documents(documents, OpenAIEmbeddings(model="text-embedding-ada-002"))

    conn_string = "mongodb://localhost:27017/edu_pilot.chat_history"

    message_history = MongoDBChatMessageHistory(
    connection_string=conn_string, session_id=session_id
    )

    if message_history.messages == []:
        response, chat_history = get_response(db, chat, query)
    
    else:
        response, chat_history = get_response(db, chat, query, message_history.messages)
    
    message_history.add_user_message(query)

    message_history.add_ai_message(response)

    return {"response": response}