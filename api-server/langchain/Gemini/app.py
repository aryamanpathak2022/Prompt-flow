import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

# Load environment variables
load_dotenv()

# Initialize the Google Gemini model
llm = ChatGoogleGenerativeAI(
    model="gemini-1.5-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

# Initialize message history
chat_history = ChatMessageHistory()

# Create a structured prompt using ChatPromptTemplate
prompt_template = ChatPromptTemplate.from_messages(
    [
        SystemMessage(content="You are a helpful assistant. give the code for the specified task given by the user"),
        MessagesPlaceholder(variable_name="messages")
    ]
)

def main():
    # Console-based input loop
    while True:
        # Input box for user question
        input_text = input("What question do you have in mind? (Type 'exit' to quit): ")

        if input_text.lower() == 'exit':
            break

        if input_text:
            try:
                # Add the user message to the history
                chat_history.add_user_message(input_text)
                
                # Prepare the messages for the chain using LangChain message classes
                messages = []
                
                # Convert history into LangChain's message types
                for message in chat_history.messages:
                    if message.type == "human":
                        messages.append(HumanMessage(content=message.content))
                    else:
                        messages.append(AIMessage(content=message.content))

                # Prepare the input for the chain with the structured prompt
                prompt_input = {"messages": messages}
                
                # Use the prompt template to generate the chat prompt value
                prompt_value = prompt_template.format_prompt(**prompt_input)
                
                # Execute the LLM with the generated messages (extracting from prompt value)
                result = llm(prompt_value.to_messages())

                # Add the assistant's response to the chat history
                chat_history.add_ai_message(result.content)  # Access the content directly

                # Display the result
                print(f"AI: {result.content}\n")

            except ConnectionError:
                print("Failed to connect to the service. Please ensure the service is running.")
            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
