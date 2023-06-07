FROM node


WORKDIR /usr/app

# copia package.json para a pasta /usr/app
COPY package.json ./

RUN npm install

# copia tudo instalado no passo anterio para a pasta /usr/app
COPY . .

EXPOSE 3333

# roda npm run dev
CMD ["npm", "run", "dev"] 