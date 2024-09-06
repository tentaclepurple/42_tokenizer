FROM node:18

WORKDIR /app

# Copia el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

RUN npm install --save-dev hardhat

RUN npm install --save-dev dotenv

RUN npm install @nomiclabs/hardhat-ethers ethers dotenv

RUN npm install @nomiclabs/hardhat-waffle waffle chai

# Copia el resto del proyecto
COPY . .

# Expone el puerto (si es necesario, por ejemplo si usas algún servicio HTTP)
EXPOSE 8545

# El comando por defecto ejecuta bash para interactuar
CMD [ "bash" ]
