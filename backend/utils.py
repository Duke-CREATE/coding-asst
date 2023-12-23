from langchain.schema import (
    HumanMessage,
)

def augment_prompt(query: str, db):
    # get top 3 results from knowledge base
    results = db.similarity_search(query, k=3)
    # get the text from the results
    source_knowledge = "\n".join([x.page_content for x in results])
    # feed into an augmented prompt
    augmented_prompt = f"""Using the contexts below, answer the query.

    Contexts:
    {source_knowledge}

    Query: {query}"""
    return augmented_prompt

# write function to take in chat history, the query an return a response

def get_response(db, chat, query, chat_history = []):
    prompt = HumanMessage(
    content=augment_prompt(query, db=db),
    )

    # get the response from the model
    chat_history.append(prompt)

    response = chat(chat_history)

    return response.content, chat_history
