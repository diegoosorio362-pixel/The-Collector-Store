# 🛒 Mi Tienda - E-commerce con Node.js

Una tienda online completa construida con Node.js, Express, MongoDB y frontend HTML/CSS/JavaScript.

## 🚀 Características

- ✅ **Backend robusto** con Node.js y Express
- ✅ **Base de datos** MongoDB con Mongoose
- ✅ **Autenticación** JWT segura
- ✅ **Panel de usuario** completo
- ✅ **Gestión de productos** dinámica
- ✅ **Sistema de pedidos** integrado
- ✅ **Diseño responsivo** y moderno

## 📋 Requisitos

- Node.js (versión 14 o superior)
- MongoDB (local o MongoDB Atlas)
- Navegador web moderno

## 🛠️ Instalación

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar MongoDB
- **Opción A: MongoDB Local**
  - Instalar MongoDB en tu sistema
  - Asegúrate de que esté corriendo en `mongodb://localhost:27017`

- **Opción B: MongoDB Atlas (Recomendado)**
  - Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/atlas)
  - Crear un cluster gratuito
  - Obtener la cadena de conexión
  - Actualizar `MONGODB_URI` en `config.env`

### 3. Configurar variables de entorno
Editar el archivo `config.env`:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/mi-tienda
JWT_SECRET=tu-secreto-super-seguro
```

### 4. Iniciar el servidor
```bash
# Desarrollo
npm run dev

# Producción
npm start
```

### 5. Abrir la aplicación
Visita: `http://localhost:3000`

## 🎯 Uso

### Registro de Usuario
1. Click en "Registrarse"
2. Completa el formulario
3. El usuario se crea automáticamente
4. Se inicia sesión automáticamente

### Login
1. Click en "Iniciar Sesión"
2. Usa tus credenciales
3. El panel de usuario se abre automáticamente

### Panel de Usuario
- **Perfil**: Información personal
- **Pedidos**: Historial de compras
- **Favoritos**: Productos guardados
- **Configuración**: Preferencias

## 🔧 API Endpoints

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `GET /api/user/profile` - Obtener perfil
- `PUT /api/user/profile` - Actualizar perfil

### Productos
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto (requiere auth)

### Pedidos
- `GET /api/orders` - Listar pedidos del usuario
- `POST /api/orders` - Crear pedido

## 🗄️ Base de Datos

### Esquemas
- **User**: Información de usuarios
- **Product**: Catálogo de productos
- **Order**: Pedidos de usuarios

## 🔐 Seguridad

- Contraseñas encriptadas con bcrypt
- Tokens JWT para autenticación
- Validación de datos en servidor
- CORS configurado

## 📱 Frontend

- HTML5 semántico
- CSS3 moderno con Flexbox/Grid
- JavaScript ES6+
- Diseño responsivo
- Panel de usuario deslizable

## 🚀 Despliegue

### Heroku
1. Crear app en Heroku
2. Conectar con GitHub
3. Configurar variables de entorno
4. Desplegar

### Vercel
1. Conectar repositorio
2. Configurar build command: `npm start`
3. Configurar variables de entorno
4. Desplegar

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature
3. Commit cambios
4. Push a la rama
5. Crear Pull Request

## 📄 Licencia

MIT License - ver archivo LICENSE

## 🆘 Soporte

Si tienes problemas:
1. Verifica que MongoDB esté corriendo
2. Revisa los logs del servidor
3. Verifica las variables de entorno
4. Abre un issue en GitHub

## 🎉 ¡Disfruta tu tienda!

¡Tu tienda online está lista para usar! 🛒✨
