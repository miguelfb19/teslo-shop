
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

# Hacer la autenticación:

Documentación: https://authjs.dev/getting-started/installation?framework=Next.js o https://nextjs.org/learn/dashboard-app/adding-authentication

1. Instalar next.auth (Auth.js) ```npm install next-auth@beta```
2. Crear la variable de entorno AUTH_SECRET ```npx auth secret```
3. Crear el archivo ```auth.config.js``` en el src del proyecto con el siguiente código:

```
import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: 'auth/new-user'
  },
  providers: [],
} satisfies NextAuthConfig;
```

4. Hacer la configuración respectiva de proveedores de autenticación y rutas de login y signUp
5. Conectar login form con NextAuth (<mark>IMPORTANTE</mark> en este punto verificar que cada campo del form este identificado con el name para ser parseado por NextAuth)
6. Crear el esquema prisma para usuarios



# Producción:

