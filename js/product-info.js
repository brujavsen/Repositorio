function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
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
                        <td id="nameTh"></td>
                        <td class="badge badge-success">`+ info.currency + " " + info.cost + `</td>
                        <td>`+ info.soldCount + `</td>
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
                    // console.log(infoProd);
                    // console.log(listadoPrd);

                    //Muestra productos relacionados
                    showProductRel(infoProd, listadoPrd);

                    //Muestra en pantalla el nombre del producto seleccionado
                    let param = getParameterByName('product');
                    let nameTh = document.getElementById('nameTh');
                    nameTh.innerHTML = `${param}`
                    
                });
        });

});


//Hora/fecha local

var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
if (day < 10) {
    day = '0' + day;
}
if (month < 10) {
    month = '0' + month;
}
var hour = date.getHours();
var minutes = date.getMinutes();
var seconds = date.getSeconds();
date = day + '-' + month + '-' + year + ' ' + hour + ':' + minutes + ':' + seconds;

//Crear un nuevo comentario

let userNameComment = document.getElementById('user-name-comment');
let commentText = document.getElementById('comment-text');
let starComment = document.getElementById('stars');
let newCommentCnt = document.getElementById('new-comment-cnt');

function createNewComment() {

    //Datos ingresados por el usuario
    function commentUsuario(name, comment, star, date) {
        this.name = name;
        this.comment = comment;
        this.star = star;
        this.date = date;
    }

    var nombreUser = userNameComment.value;
    var comentarioUsr = commentText.value;
    var starCommty = starComment.value;
    var todayPrest = date;

    //Crear nuevo comentario
    newCommentUser = new commentUsuario(nombreUser, comentarioUsr, starCommty, todayPrest);
    console.log(newCommentUser);
    showComentary();
};

//Guarda nuevo comentario en array
var newCommentary = [];

//Selección de estrellas
function newStarComment(starCount) {

    let starComment = "";
    for (let i = 0; i < starCount.star; i++) {
        starComment += `
            <small class="text-muted"><span class="fa fa-star checked"></span></small>
            `;
    }
    return starComment;
}

//Muestra comentario en pantalla
function showComentary() {
    newCommentary.push(newCommentUser);
    newCommentCnt.innerHTML += `
        <div>
            <div>
                <h2>`+ newCommentUser.name + `<small class="text-muted">` + newStarComment(newCommentUser) + `</small>` + `</h2>
            </div>
            <br>
            <div>
                <small>`+ newCommentUser.comment + `</small>
            </div>
            <br>
            <div>
                <small>`+ newCommentUser.date + `</small>
            </div>
        </div>`
}
