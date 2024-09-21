import os
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage
from fastapi import FastAPI
from langserve import add_routes

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

# Frontend template for generating initial response
frontend_template = '''You are an expert software developer. Provide the **frontend setup** for an application. Use the following context to create the frontend.

**Frontend File Structure Setup**:

terminal: mkdir my-frontend-app  
terminal: cd my-frontend-app  
terminal: npm init -y  

terminal: npm install react react-dom react-router-dom  
terminal: mkdir src  
terminal: touch src/index.js  
terminal: touch src/App.js  
terminal: touch src/pages/Home.js  
terminal: touch src/pages/About.js  
terminal: touch src/pages/Contact.js  
terminal: mkdir components  
terminal: touch components/Navbar.js  
terminal: touch components/Footer.js  

Ensure the following for the **frontend setup**:
1. **Terminal commands** should start with "terminal:" followed by the command.
2. Only provide setup details, no implementation code.

The generated output should include:
- Terminal commands for the frontend setup.
- Code for each specified file, including:
  - **Entry Point:**
    - `src/index.js` for React application entry.
  - **Main Component:**
    - `src/App.js` for the main application component.
  - **Page Components:**
    - `src/pages/Home.js`, `src/pages/About.js`, `src/pages/Contact.js`.
  - **Components:**
    - `components/Navbar.js`, `components/Footer.js`.
'''

# Template for backend setup
generic_backend_template = '''You are an expert software developer. Provide the **backend setup** for an application. Use the following frontend setup for context.

**Frontend File Structure Setup**:

terminal: mkdir my-frontend-app  
terminal: cd my-frontend-app  
terminal: npm init -y  

terminal: npm install react react-dom react-router-dom  
terminal: mkdir src  
terminal: touch src/index.js  
terminal: touch src/App.js  
terminal: touch src/pages/Home.js  
terminal: touch src/pages/About.js  
terminal: touch src/pages/Contact.js  
terminal: mkdir components  
terminal: touch components/Navbar.js  
terminal: touch components/Footer.js  

Ensure the following for the **backend setup**:
1. **Terminal commands** should start with "terminal:" followed by the command.
2. Only provide setup details, no implementation code.

The generated output should include:
- Terminal commands for the backend setup.
- Code for each specified file, including:
  - **General Setup:**
    - `index.js` for Express server setup and database connection.
    - `config/database.js` for database configuration.
  - **Routes:**
    - A list of route files (`routes/[routeName].js`) that can be any number, with necessary routes and endpoints.
  - **Models:**
    - A list of model files (`models/[modelName].js`) that can be any number, defining the schemas.
  - **Middleware:**
    - A list of middleware files (`middleware/[middlewareName].js`) that can be any number, implementing required logic.
  - **Environment Variables:**
    - Sample content for the `.env` file, including necessary environment variables.
'''

parser = StrOutputParser()

def main():
    while True:
        # Take user input for website name
        website_name = input("Please enter the website name you are trying to build: ")

        if website_name.lower() == 'exit':
            break

        if website_name:
            try:
                # Generate frontend setup commands based on website name
                frontend_setup_template = frontend_template.format(website_name=website_name)
                result_frontend_setup = llm.invoke(frontend_setup_template)
                chat_history.add_ai_message(parser.invoke(result_frontend_setup))
                print(f"AI (Frontend Setup): {parser.invoke(result_frontend_setup)}\n")

                # Process frontend code generation templates
                frontend_code_templates = [
                    {
                        "description": "main application entry point",
                        "file": "src/index.js",
                        "template": '''Now, generate the code for the main application entry point in the frontend using React:
1. **Entry Point:**
   - `src/index.js`
Please provide the complete code for `src/index.js` to set up the React application. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "main application component",
                        "file": "src/App.js",
                        "template": '''Next, generate the code for the main application component:
2. **Main Component:**
   - `src/App.js`
Please provide the complete code for `src/App.js` for the main application component. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "Home page component",
                        "file": "src/pages/Home.js",
                        "template": '''Next, generate the code for the Home page component:
3. **Home Page:**
   - `src/pages/Home.js`
Please provide the complete code for `src/pages/Home.js` for the Home page component. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "About page component",
                        "file": "src/pages/About.js",
                        "template": '''Next, generate the code for the About page component:
4. **About Page:**
   - `src/pages/About.js`
Please provide the complete code for `src/pages/About.js` for the About page component. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "Contact page component",
                        "file": "src/pages/Contact.js",
                        "template": '''Next, generate the code for the Contact page component:
5. **Contact Page:**
   - `src/pages/Contact.js`
Please provide the complete code for `src/pages/Contact.js` for the Contact page component. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "Navbar component",
                        "file": "components/Navbar.js",
                        "template": '''Next, generate the code for the Navbar component:
6. **Navbar:**
   - `components/Navbar.js`
Please provide the complete code for `components/Navbar.js` for the Navbar component. Make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "Footer component",
                        "file": "components/Footer.js",
                        "template": '''Next, generate the code for the Footer component:
7. **Footer:**
   - `components/Footer.js`
Please provide the complete code for `components/Footer.js` for the Footer component. Make sure you don't provide additional explanation.
'''
                    }
                ]

                # Process each frontend template to generate corresponding code
                for item in frontend_code_templates:
                    result_code = llm.invoke(item["template"])
                    chat_history.add_ai_message(result_code)
                    print(f"AI (Frontend Code - {item['description']}): {parser.invoke(result_code)}\n")

                # Ask for database name and port number
                database_name = input("Please enter the database name: ")
                port_number = input("Please enter the port number for the server: ")

                # Generate backend setup commands
                backend_setup_template = generic_backend_template
                result_setup = llm.invoke(backend_setup_template)
                chat_history.add_ai_message(parser.invoke(result_setup))
                print(f"AI (Backend Setup): {parser.invoke(result_setup)}\n")

                # Process the general setup files for backend
                backend_templates = [
                    {
                        "description": "backend application entry point",
                        "file": "index.js",
                        "template": '''Now, generate the code for the backend application entry point using Node.js and Express.js. The structure includes:
1. **Entry Point:**
   - `index.js`
Please provide the complete code for `index.js` to set up the Express server and connect to the database, using the database name from the .env file as `${DATABASE_NAME}`, and make sure you don't provide additional explanation.
'''
                    },
                    {
                        "description": "database connection file",
                        "file": "config/database.js",
                        "template": '''Next, generate the code for the database connection file in the backend application:
2. **Database Connection:**
   - `config/database.js`
Please provide the complete code for `config/database.js` for database configuration make sure that you don't provide additional explanation.
'''
                    }
                ]

                # Add templates for routes, models, middleware, and environment variables
                routes = ["userRoutes", "workoutRoutes", "exerciseRoutes"]
                models = ["User", "Workout", "Exercise"]
                middleware = ["authMiddleware", "loggerMiddleware"]

                for route in routes:
                    backend_templates.append({
                        "description": f"route file for {route}",
                        "file": f"routes/{route}.js",
                        "template": f'''Now, generate the code for the route file in the Node.js and Express.js application (no explanation required):
3. **Routes:**
   - `routes/{route}.js`
Please provide the code for the route file defining the necessary routes and endpoints. Make sure you don't provide additional explanation.
'''
                    })

                for model in models:
                    backend_templates.append({
                        "description": f"model file for {model}",
                        "file": f"models/{model}.js",
                        "template": f'''Next, generate the code for the model file (no explanation required):
4. **Models:**
   - `models/{model}.js`
Please provide the code for the model file defining the schema for {model}. Make sure you don't provide additional explanation.
'''
                    })

                for mw in middleware:
                    backend_templates.append({
                        "description": f"middleware file for {mw}",
                        "file": f"middleware/{mw}.js",
                        "template": f'''Finally, generate the code for the middleware file (no explanation required):
5. **Middleware:**
   - `middleware/{mw}.js`
Please provide the code for the middleware file implementing the required logic. Make sure you don't provide additional explanation.
'''
                    })

                backend_templates.append({
                    "description": "environment variables",
                    "file": ".env",
                    "template": f'''Finally, generate the code for the environment variables (no explanation required):
6. **Environment Variables:**
   - `.env`
The database name is `{database_name}` and the port number is `{port_number}`.
Please provide sample content for the `.env` file, including these variables. Make sure you don't provide additional explanation.
'''
                })

                # Process each backend template to generate corresponding code
                for item in backend_templates:
                    result_code = llm.invoke(item["template"])
                    chat_history.add_ai_message(result_code)
                    print(f"AI (Backend Code - {item['description']}): {parser.invoke(result_code)}\n")

            except Exception as e:
                print(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
