import os
from dotenv import load_dotenv
import streamlit as st
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.runnables import chain

# Load environment variables
load_dotenv()

# Print credentials for debugging (ensure to remove this in production)
print("Google Application Credentials:", os.getenv("GOOGLE_APPLICATION_CREDENTIALS"))

# Initialize the Google Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# Streamlit app setup
st.title("Langchain Demo With Gemini-1.5 Pro Model")

# Create a structured prompt using ChatPromptTemplate
prompt_template = ChatPromptTemplate.from_messages(
    [
        ("system", "You are a helpful assistant. Answer all the questions to the best of your ability."),
        MessagesPlaceholder(variable_name="messages")
    ]
)

# Set up the chain using prompt_template and llm
LLM_chain = prompt_template | llm

# Input box for user question
input_text = st.text_input("What question do you have in mind?")

if input_text:
    try:
        # Prepare the input for the chain without wrapping them in SystemMessage or HumanMessage classes
        messages = [{"role": "user", "content": input_text}]
        
        # Execute the chain with the user's input
        result = LLM_chain.invoke({"messages": messages})

        # Display the result
        st.write(result)

    except ConnectionError:
        st.error("Failed to connect to the service. Please ensure the service is running.")
    except Exception as e:
>