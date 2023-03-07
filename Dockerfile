#use alpine container as the base image
FROM node:alpine

# Specify your e-mail address as the maintainer of the container image
MAINTAINER Your Name "yihui2@pdx.edu"

# Set the working directory of the container to /app
WORKDIR /app

COPY package.json /app

#build  project dependencies
RUN npm install

# Copy the contents of the current directory into the container directory /app
COPY . /app
#run the program
CMD ["npm", "start"]