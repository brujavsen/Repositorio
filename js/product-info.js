//Información del producto
fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(info => {
        //muestra en pantalla la información del producto
        let showProductInfo = document.getElementById("containerInfo");
        showProductInfo.innerHTML = `
        
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Costo</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Categoría</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th> `+ info.name + `</th>
                        <td class="badge badge-success">`+ info.currency + " " + info.cost + `</td>
                        <th>`+ info.soldCount + `</th>
                        <td class="badge badge-danger">`+ info.category + `</td>
                    </tr>
                </tbody>
            </table>
            <p class="infoDesc">` + info.description + `</p>
                
        `
    });


//Estrellas de comentarios

function showStar(stars) {

    let htmlContentComment = "";

    for (let i = 0; i < stars.score; i++) {
        htmlContentComment += `
            <small class="text-muted"><span class="fa fa-star checked"></span></small>
            `;
    }
    return htmlContentComment;
};

//Comentarios del producto
function showComments(commentProd) {

    let htmlContentComment = "";

    for (let i = 0; i < commentProd.length; i++) {
        let comments = commentProd[i];
        htmlContentComment +=
            `
                <div class="commentProduct">
                    <div>
                        <h2>`+ comments.user + `<small class="text-muted">` + showStar(comments) + `</small>` + `</h2>
                    </div><br>
                    <div>
                        <small class="commentDesc">` + comments.description + `</small>
                    </div><br>
                    <div>
                        <small>`+ comments.dateTime + `</small>
                    </div>
                </div>
                `
    };
    let showComments = document.getElementById("contenedorComments");
    showComments.innerHTML = htmlContentComment;
};


function showProductRel(dataRel, dataList) {

    let htmlContentProdRel = "";
    for (let i = 0; i < dataRel.relatedProducts.length; i++) {
        let listarProdRel = dataList[dataRel.relatedProducts[i]];

        htmlContentProdRel +=
            `
                <a class="card custom-card" href="./product-info.html?product=`+ listarProdRel.name + `">
                    <div>
                        <img src="` + listarProdRel.imgSrc + `" class="card-img-top" alt="` + listarProdRel.description + `">
                        <div class="card-body">
                            <h5 class="card-title font-weight-bold">`+ listarProdRel.name + `</h5>
                            <p class="card-text">` + listarProdRel.description + `</p>
                            <p class="card-text badge badge-primary">`+ listarProdRel.cost + " " + listarProdRel.currency + `</p>
                        </div>
                    </div>
                </a>
            `
    };

    document.getElementById('relatedProd').innerHTML = htmlContentProdRel;
};

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function () {

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            var infoComment = resultObj.data;
            //muestra los comentarios del producto en pantalla
            showComments(infoComment);
        };
    });

    //Objeto listado de información de productos
    getJSONData(PRODUCT_INFO_URL)
        .then(function (infoObj) {
            var infoProd = infoObj.data;

            //Objeto listado de productos
            getJSONData(PRODUCTS_URL)
                .then(function (resObj) {
                    var listadoPrd = resObj.data;
                    console.log(infoProd);
                    console.log(listadoPrd);

                    //Muestra productos relacionados
                    showProductRel(infoProd, listadoPrd);

                });
        });

});


//Hora/fecha local

var fecha = new Date();
var dia = fecha.getDate();
var mes = fecha.getMonth();
var ano = fecha.getFullYear();
if (dia < 10) {
    dia = '0' + dia;
}
if (mes < 10) {
    mes = '0' + mes;
}
var hora = fecha.getHours();
var minutos = fecha.getMinutes();
var segundos = fecha.getSeconds();
fecha = dia + '-' + mes + '-' + ano + ' ' + hora + ':' + minutos + ':' + segundos;

//Crear un nuevo comentario

let newComm = document.getElementById('commentUsuario');
let starComm = document.getElementById('clasificacion');
let usrCommName = document.getElementById('userComment');
let commentUser = document.getElementById('commUsr');

function createNewComment() {

    //Datos ingresados por el usuario
    function commentUsuario(nombre, comentario, estrellitas, fechaActual) {
        this.nombre = nombre;
        this.comentario = comentario;
        this.estrellitas = estrellitas;
        this.fechaActual = fechaActual;
    }

    var nombreUser = usrCommName.value;
    var comentarioUsr = newComm.value;
    var starCommty = starComm.value;
    var todayPrest = fecha;

    //Crear nuevo comentario
    nuevoComentario = new commentUsuario(nombreUser, comentarioUsr, starCommty, todayPrest);
    console.log(nuevoComentario);
    showComentary();

};

//Guarda nuevo comentario en array
var newCommentary = [];

//Selección de estrellas

function newStarComment(starCount) {

    let commUser = "";
    for (let i = 0; i < starCount.estrellitas; i++) {
        commUser += `
            <small class="text-muted"><span class="fa fa-star checked"></span></small>
            `;
    }
    return commUser;
}

//Muestra comentario en pantalla
function showComentary() {
    newCommentary.push(nuevoComentario);
    commentUser.innerHTML += `
        <div>
            <div>
                <h2>`+ nuevoComentario.nombre + `<small class="text-muted">` + newStarComment(nuevoComentario) + `</small>` + `</h2>
            </div>
            <br>
            <div>
                <small>`+ nuevoComentario.comentario + `</small>
            </div>
            <br>
            <div>
                <small>`+ nuevoComentario.fechaActual + `</small>
            </div>
        </div>`
}