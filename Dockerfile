###################
# BUILD for development/production
###################

FROM node:18-alpine As builder

WORKDIR /usr/src/app/

#COPY --chown=node:node ./src/api/package*.json .
#COPY --chown=node:node ./src/api/ .

COPY  ./src/api/package*.json ./
COPY  ./src/api/ ./

RUN npm install glob rimraf

RUN npm install

RUN npm run build


#USER node


###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM builder As development

# Create app directory
#WORKDIR /usr/src/app

# Use the node user from the image (instead of the root user)
# USER node
ENV NODE_ENV=local

EXPOSE 3000

CMD ["npm", "run", "start:debug-pnp"]


###################
# PRODUCTION
###################

# FROM build-runner As production
FROM node:18-alpine As production

WORKDIR /usr/src/app/

# RUN npm install -g pm2@9.5.1

# Copy the bundled code from the build stage to the production image
COPY --chown=node:node --from=builder /usr/src/app/package*.json ./

COPY --chown=node:node --from=builder /usr/src/app/dist ./dist
COPY --chown=node:node  ./scripts ./scripts
#COPY --chown=node:node --from=builder /usr/src/app/tsconfig*.json ./
RUN chmod +x ./scripts/*.sh

ENV NODE_ENV=production

# Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
RUN npm ci --only=production && npm cache clean --force
RUN npm install -g pm2

EXPOSE 3000
# WORKDIR /usr/src/app/scripts
USER node
#CMD [ "pm2", "start", "./dist/main.js", "--name", "pnp-services-api"]
ENTRYPOINT [ "./scripts/entrypoint.sh" ]
