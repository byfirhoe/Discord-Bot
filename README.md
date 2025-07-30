# Basic Discord Bot

Este es un bot de Discord modular desarrollado con `discord.js v14`. Incluye comandos personalizables, sistema de niveles, economía básica y administración de servidores.

## 🚀 Funcionalidades destacadas

- Comandos estructurados por carpetas (categorías)
- Registro automático de comandos slash
- Sistema de niveles y XP
- Comandos de administración (`ban`, `kick`, `timeout`)
- Comando diario (`daily`) con cooldown

## 🛠 Tecnologías

- [Node.js](https://nodejs.org/)
- [discord.js](https://discord.js.org/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [MongoDB](https://www.mongodb.com/) _(para el sistema de niveles)_

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/byfirhoe/Discord-Bot.git
   cd Discord-Bot
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Crea un archivo .env con lo siguiente:
   ```bash
   TOKEN=tu_token_de_discord
   CLIENT_ID=tu_id_de_aplicación
   GUILD_ID=id_del_servidor_de_prueba
   MONGO_URI=mongodb://localhost/discordbot
   ```
4. Ejecuta el bot en modo desarrollo:

   ```bash
    nodemon
   ```

O en modo producción:

    node src/index.js

    ```

## 💻 Estructura del proyecto

    Discord-Bot/
    ├── commands/
    │ ├── admin/
    │ ├── economy/
    │ └── levels/
    ├── events/
    ├── functions/
    ├── models/
    ├── src/
    │ └── index.js
    ├── utils/
    └── .env

```

## ✅ Comandos Disponibles

- `/daily`: Reclama monedas diarias

- `/level`: Muestra tu nivel y XP

- `/kick @usuario`: Expulsa a un usuario

- `/ban @usuario`: Banea a un usuario

- `/timeout @usuario`: Silencia a un usuario por un tiempo

```
