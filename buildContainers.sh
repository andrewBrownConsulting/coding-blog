docker build -t andrewb1234/blog-frontend:mac ./frontend/
docker build -t andrewb1234/blog-backend:mac ./backend/
docker build -t andrewb1234/blog-images-api:mac ./images-api/ --no-cache
# docker push andrewb1234/blog-frontend:mac
# docker push andrewb1234/blog-backend:mac
# docker push andrewb1234/blog-images-api:mac
