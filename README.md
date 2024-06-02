# Descripcion:

Conexa test es una prueba tecnica para el puesto de desarrollador backend en Conexa. La funcion principal de la api es hacer poder hacer un crud sobre peliculas de starwars (u otras sagas de peliculas) y un manejo de roles para gestionar el accesos de algunos endpoints.

La db se actualiza con la api oficial de starwars. Si se quisiera poder consumir otras apis para otra pelicula, podemos generar una strategia que lo haga.

## Inicializar el proyecto:

1. Descargar el repo
2. Estando en la carpeta del proyecto ejecutar el comando:

```bash
  docker compose up
```

3. Una vez que el docker este levantado, ejecuta el comando:

```bash
  npm run prisma:generate
```

4. Luego ejecuta el comando:

```bash
 npm run prisma:migrate
```

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start:dev
```

## Flujo regular

- Crear un usuario

- Loguearse con el usuario

- Con el accesstoken probar los diferentes endpoints. La documentacion la puedes encontrar en

```bash
localhost:${PORT}/api
```

## envs

```bash
PORT=
HASH_SALT=
DATABASE_URL=
JWT_SECRET=
```
