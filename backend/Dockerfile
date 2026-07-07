# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Create a non-privileged user and group
RUN groupadd -r appgroup && useradd -r -g appgroup appuser

# Copy requirements first to leverage Docker cache
COPY --chown=appuser:appgroup requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY --chown=appuser:appgroup . .

# Switch to the non-privileged user
USER appuser

# Expose port (useful documentation, host will override via env variable)
EXPOSE 8000

# Run the application with uvicorn
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
