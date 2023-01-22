
let boton = document.getElementById("button")
//boton.addEventListener("click", () => alert('hizo click'))//funcion anonima para que no se ejeculte en el momento
//boton.addEventListener("click", mostrarAlert)//funcion anonima para que no se ejeculte en el momento
function mostrarAlert(){
    alert('queda poco stock')
}
//boton.onclick = mostrarAlert()//idem al de arrib
//el objeto literal productos llega de la DB.
let productos = [
    {id: 2 , nombre: "Patek", categoria: "Relojes", precio: 78000, stock: 6, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/231989/PatekPhilippe-Nautilus-71181200A-001-231989-6-221124-142341.jpg;quality=90;h=425"},
    {id: 5 , nombre: "Omega", categoria: "Relojes", precio: 6000, stock: 4, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/212195/Omega-OlympicSeamaster-522.30.42.20.04.001-212195-2-220131-131308.jpg;quality=90;h=425"},
    {id: 8 , nombre: "IWC", categoria: "Relojes", precio: 30000, stock: 8, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/226794/IWC-BigPilots-IW502708-226794-3-220817-145001.jpg;quality=90;h=425"},
    {id: 9 , nombre: "AP", categoria: "Relojes", precio: 40000, stock: 10, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/232881/AudemarsPiguet-RoyalOak-15400ST.OO.1220ST.04-232881-1-221128-094029.jpg;quality=90;h=425"},
    {id: 10 , nombre: "Patek", categoria: "Relojes", precio: 78000, stock: 6, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/231989/PatekPhilippe-Nautilus-71181200A-001-231989-6-221124-142341.jpg;quality=90;h=425"},
    {id: 15 , nombre: "Omega", categoria: "Relojes", precio: 6000, stock: 4, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/212195/Omega-OlympicSeamaster-522.30.42.20.04.001-212195-2-220131-131308.jpg;quality=90;h=425"},
    {id: 12, nombre: "IWC", categoria: "Relojes", precio: 30000, stock: 8, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/226794/IWC-BigPilots-IW502708-226794-3-220817-145001.jpg;quality=90;h=425"},
    {id: 11, nombre: "AP", categoria: "Relojes", precio: 40000, stock: 10, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/232881/AudemarsPiguet-RoyalOak-15400ST.OO.1220ST.04-232881-1-221128-094029.jpg;quality=90;h=425"},
    {id: 16 , nombre: "Omega", categoria: "Relojes", precio: 6000, stock: 4, imgUrl: "https://images.watchfinder.co.uk/imgv2/stock/212195/Omega-OlympicSeamaster-522.30.42.20.04.001-212195-2-220131-131308.jpg;quality=90;h=425"}
  ]
let carrito = []

let contenedorProductos = document.getElementById("contenedorProductos")
let contenedorCarrito = document.getElementById("contenedorCarrito")
let buscador = document.getElementById("buscador")
let buscar = document.getElementById("buscar")
buscar.onclick = filtrar

renderizarProductos(productos)

function filtrar(e) {
  console.log("E", e.target.id)
  let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()) || producto.categoria.toLowerCase().includes(buscador.value.toLowerCase()))
  console.log(productosFiltrados)
  renderizarProductos(productosFiltrados)
}


function renderizarProductos(arrayDeProductos) {
  contenedorProductos.innerHTML = ""
  arrayDeProductos.forEach(producto => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.classList.add("producto")
    tarjetaProducto.id = `tarjeta${producto.id}`

    tarjetaProducto.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>$${producto.precio}</p>
      <img class"imgProductos" src=${producto.imgUrl} />
      <button class="btn btn-primary" id=${producto.id}>Agregar al carrito</button>
    `
    if (producto.stock < 10) {
      tarjetaProducto.classList.add("pocoStock")
      let pocasUnidades = document.createElement('p')
      pocasUnidades.innerText = "Quedan pocas unidades"
      tarjetaProducto.appendChild(pocasUnidades)
    }

    contenedorProductos.append(tarjetaProducto)

    let boton = document.getElementById(producto.id)
    boton.onclick = agregarAlCarrito
  })
}

function agregarAlCarrito(e) {
  let id = e.target.id
  let productoBuscado = productos.find(producto => producto.id == id)
  let productoEnCarrito = carrito.find(producto => producto.id == productoBuscado.id)

  if (productoEnCarrito) {
    let posicionProducto = carrito.findIndex(producto => producto == productoEnCarrito)
    carrito[posicionProducto].unidades++
    carrito[posicionProducto].subtotal = carrito[posicionProducto].precio * carrito[posicionProducto].unidades
  } else {
    // tiene todas las propiedades de antes + unidades y subtotal
    productoBuscado.unidades = 1
    productoBuscado.subtotal = productoBuscado.precio
    carrito.push(productoBuscado)
  }

  renderizarCarrito(carrito)
}

function renderizarCarrito(productosEnCarrito) {
  contenedorCarrito.innerText = ""
  productosEnCarrito.forEach(producto => {
    let tarjetaProducto = document.createElement("div")
    tarjetaProducto.classList.add("itemCarrito")
    tarjetaProducto.innerHTML += `
      <h3>Marca: ${producto.nombre}</h3>
      <p>Cantidad: ${producto.unidades}</p>
      <p>Precio $${producto.subtotal}</p>
    `
    contenedorCarrito.appendChild(tarjetaProducto)
  })
}

let ropa = document.getElementById("ropa")
ropa.onclick = filtrarPorCategoria

function filtrarPorCategoria(e) {
  let productosFiltrados = productos.filter(producto => producto.categoria === e.target.id)
  renderizarProductos(productosFiltrados)
}