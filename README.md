# bGames-UserManagementService
[![Build Status](https://travis-ci.com/Tisks/bGames-UserManagementService.svg?branch=main)](https://travis-ci.com/Tisks/bGames-UserManagementService)[![Coverage Status](https://coveralls.io/repos/github/Tisks/bGames-UserManagementService/badge.svg?branch=main)](https://coveralls.io/github/Tisks/bGames-UserManagementService?branch=main)[![Maintainability](https://api.codeclimate.com/v1/badges/9c77646f00310c94cb9d/maintainability)](https://codeclimate.com/github/Tisks/bGames-UserManagementService/maintainability)[![Test Coverage](https://api.codeclimate.com/v1/badges/9c77646f00310c94cb9d/test_coverage)](https://codeclimate.com/github/Tisks/bGames-UserManagementService/test_coverage)[![Build status](https://ci.appveyor.com/api/projects/status/r7ghjnwk1cl4v8lf/branch/main?svg=true)](https://ci.appveyor.com/project/Tisks/bgames-usermanagementservice/branch/main)

## Documentación

Esta API utiliza [Swagger UI](https://swagger.io/tools/swagger-ui/) para documentar y probar los endpoints disponibles.

### Acceder a la documentación interactiva

1. **Levanta tu servidor localmente**  
   ```bash
   npm run dev
   ```
2. **Abre tu navegador en:**  
   [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

Ahí podrás visualizar y probar los endpoints con Swagger UI.

---

### Ejemplo de documentación con JSDoc y Swagger

Las rutas están documentadas usando comentarios JSDoc compatibles con OpenAPI, por ejemplo:

```js
/**
 * @swagger
 * /players/:
 *   get:
 *     summary: Lista todos los jugadores de Blended Games
 *     tags: [Player]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
```

Si quieres agregar nuevas rutas, sigue este formato en tus archivos de rutas.

---

### Endpoints principales

- `GET /players/` - Lista todos los jugadores
- `POST /player` - Crea un jugador con información externa
- `PUT /players/:id` - Edita un jugador existente
- ...y más, consulta la documentación interactiva para ver el detalle y ejemplos de cada endpoint.

---

### ¿Cómo se genera la documentación?

La documentación se genera automáticamente con los comentarios JSDoc y las siguientes librerías:

- [swagger-jsdoc](https://www.npmjs.com/package/swagger-jsdoc)
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)
