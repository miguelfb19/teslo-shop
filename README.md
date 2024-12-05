
# Descripción

# Desarrollo:

1. Clonar dependencias (Fork)
2. Crear copia del archivo ```.env.template```,renombrarlo a ```.evn```
3. Instalar dependencias: ```npm install```
4. Levantar la base de datos: ```docker compose up -d``` (asegurece de tener el demonio de dokcer corriendo)
5. Retirar ```.env.template``` del .gitignore y agregar las carpeta de postgres
6. Generar migraciones de prisma ```npx migrate dev``` (en caso de ser necesario adicionalmente: ```npx prisma generate```)
7. Ejecutar el seed ```npm run seed```
8. Levantar el proyecto en localhost: ```npm run dev```


# Producción:

