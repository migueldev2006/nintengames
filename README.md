El siguiente apartado darems las indicaciones  necesarias para que el proyecto Nintengames corra con eficiencia

## Getting Started

Priemro debera clonar el proyecto


```bash
git clone https://github.com/migueldev2006/nintengames.git
```

luego de clonado debera abrir el  proyecto y dar el siguiente comando para instalar las dependencias

```bash
npm install

##o

npm install --force
```
el forzado es por si no se instala correctamanete con el primer comando


luego a la raiz del proyecto nintengames creamos el .env y añadimos lo siguiente

DATABASE_URL="mysql://root:123@localhost:3306/nintengames"

JWT_SECRET=123456


finalmente para correr el proyecto debe ejecutar 
```bash
npm run dev
```

claramente antes de ejecutar el comando debe de haber ejecutado las migraciones.

