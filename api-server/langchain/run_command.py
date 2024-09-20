import subprocess

def run_command(cmd):
    """
    Executes a terminal command passed as a string.

    Args:
        cmd (str): The command to run in the terminal.

    Returns:
        str: The output of the command (stdout or error message).
    """
    try:
        result = subprocess.run(cmd, shell=True, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        return result.stdout  # Output of the command
    except subprocess.CalledProcessError as e:
        return f"Error: {e.stderr}"  # Return error message
