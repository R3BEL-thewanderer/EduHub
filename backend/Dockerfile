FROM python:3.11-slim

WORKDIR /app

# Install python dependencies before copying code to cache layer
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Run server
# Note: CLOUD RUN expects the app to listen on PORT environment variable, default 8080
ENV PORT=8080
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT}
