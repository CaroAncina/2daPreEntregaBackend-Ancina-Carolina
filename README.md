# Proyecto ReactJS-AncinaCarolina
## **Antojitos|Tienda de comestibles**

Proyecto del curso de Backend de CoderHouse. Se desarrollará un servidor que contenga los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce


### **Pruebas a tráves de Postman**
Servidor basado en Node.JS y express, que escuche en el puerto 8080 y disponga de dos grupos de rutas: /products y /carts.


###### *Se listan todos los productos más la limitación ?limit*

**`localhost:8080/api/products`** 

![alt text](/src/public/img_readme/image1.png)

###### *Muestra sólo el producto con el id proporcionado*

**`localhost:8080/api/products/:pid`** 

![alt text](/src/public/img_readme/image2.png)

###### *Agrega un nuevo producto al JSON, thumbnails es opcional y status:true* 

**`localhost:8080/api/products`** 

![alt text](/src/public/img_readme/image3.png)

###### *Toma el producto y actualiza los campos en el JSON*

**`localhost:8080/api/products/:pid`** 

![alt text](/src/public/img_readme/image4.png)

###### *Elimina el producto segun el ID*

**`localhost:8080/api/products/:pid`** 

![alt text](/src/public/img_readme/image5.png)

###### *Se crean los nuevos carritos*

 **`localhost:8080/api/carts`**

![alt text](/src/public/img_readme/image6.png)

###### *Se agregan productos (segun cantidad) al carrito seleccionado por id*

**`localhost:8080/:api/carts/:cid/product/:pid`**

![alt text](/src/public/img_readme/image7.png)

###### *Lista los productos del carrito correspondiente*

**`localhost:8080/:api/carts/:cid`**

![alt text](/src/public/img_readme/image8.png)
