//Información del producto
fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(info => {
        //muestra en pantalla la información del producto
       let showProductInfo = document.getElementById("contenedorInfo");
       showProductInfo.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col">
                    <div id="container-productInfo" class"jumbotron">

                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <h2 class="display-4">`+ info.name +`</h2>
                        </li>
                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <p class="costPrd">Precio:</p> <span class="badge badge-primary badge-pill">`+ info.currency + " " + info.cost +`</span>
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <p class="countPrd">Cantidad:</p> <span class="badge badge-primary badge-pill">`+ info.soldCount +`</span>                
                        </li>

                        <li class="list-group-item d-flex justify-content-between align-items-center">
                            <div class="lead">Categoria:</div> <span class="badge badge-primary badge-pill">`+ info.category +`</span>
                        </li>
                    </ul>


                        <a class="buyPrd btn btn-info" href="./cart.html">Añadir al carrito<a>

                    </div>

                    <div id="cnt-descInfo">
                        <div class="col-9">
                            <h2>Descripción:</h2>
                            <p>` + info.description +`</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });


//SlideShow Images
    let slideImg = document.querySelector('.slider-img').children;
    let nextSlide = document.querySelector('.right-slide');
    let prevSlide = document.querySelector('.left-slide');
    let totalSlideImg = slideImg.length;
    let index=0;

    nextSlide.onclick=function(){
        next('next');
    }

    prevSlide.onclick=function(){
        next('prev');
    }

    function next(direccion){

        if(direccion=="next"){
            index++;
            if(index==totalSlideImg){
                index=0;
            }
        }else{
            if(index==0){
                index==totalSlideImg-1;
                }else{
                    index--
                }
        }
        for(i=0;i<slideImg.length;i++){
            slideImg[i].classList.remove("active")
        }
        slideImg[index].classList.add("active");
    }


//Estrellas de comentarios

    function showStar(stars){

        let htmlContentComment = "";

        for(let i=0; i < stars.score; i++){
            htmlContentComment += `
            <small class="text-muted"><span class="fa fa-star checked"></span></small>
            `;
        }
        return htmlContentComment;
    }

//Comentarios del producto
    function showComments(commentProd){

        let htmlContentComment = "";

            for(let i = 0; i < commentProd.length; i++){
                let comments = commentProd[i];
                htmlContentComment +=
                `
                <div class="commentProduct">
                    <div>
                        <h2>`+ comments.user + `<small class="text-muted">`+ showStar(comments) +`</small>`+ `</h2>
                    </div><br>
                    <div>
                        <small class="commentDesc">` + comments.description +`</small>
                    </div><br>
                    <div>
                        <small>`+ comments.dateTime +`</small>
                    </div>
                </div>
                `
            }
            let showComments = document.getElementById("contenedorComments");
            showComments.innerHTML = htmlContentComment
    }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(){

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
        var infoComment = resultObj.data;
        //muestra los comentarios del producto en pantalla
        showComments(infoComment);
        };
    });
}); 



//Productos relacionados
fetch(PRODUCTS_URL)
    .then(response => response.json())
    .then(relPrd => {

        for(let i=0; i < relPrd.length; i++){
            var relProd = relPrd[3]
        }

        //muestra en pantalla la información del producto
        var showRelPrd = document.getElementById('car');
        showRelPrd.innerHTML = `
        <p class="display-4">Productos de relevancia:</p>
        <div class="productsRel">
            <a href="./product-info.html?`+relProd.name+`">
                <img src="` + relProd.imgSrc + `" alt="` + relProd.description + `" class="img-thumbnail">
                <h3 class="mb-1">`+ relProd.name +`</h3>
                <small class="text-muted">` + relProd.description +`</small><br>
                <small class="text-muted">`+ relProd.soldCount +` articulos</small><br>
                <small class="text-muted">`+ relProd.cost + " " + relProd.currency +` </small>
            </a> 
        </div>
        `
        for(let i=0; i < relPrd.length; i++){
            var relProd = relPrd[1]
        }

        //muestra en pantalla la información del producto
        var showRelPrd = document.getElementById('car');
        showRelPrd.innerHTML += `
        <div class="productsRel">
            <a href="./product-info.html?`+relProd.name+`">
                <img src="` + relProd.imgSrc + `" alt="` + relProd.description + `" class="img-thumbnail">
                <h3 class="mb-1">`+ relProd.name +`</h3>
                <small class="text-muted">` + relProd.description +`</small><br>
                <small class="text-muted">`+ relProd.soldCount +` articulos</small><br>
                <small class="text-muted">`+ relProd.cost + " " + relProd.currency +` </small>
            </a> 
        </div>
        `
    });


//Hora/fecha local

    var fecha = new Date();
    var dia = fecha.getDate();
    var mes = fecha.getMonth();
    var ano = fecha.getFullYear();
    if(dia<10)
    {
        dia='0'+dia;
    }
    if(mes<10)
    {
        mes='0'+mes;
    }
    var hora = fecha.getHours();
    var minutos = fecha.getMinutes();
    var segundos = fecha.getSeconds();
    fecha = dia+'-'+mes+'-'+ano+' '+hora+':'+minutos+':'+segundos;
    
//Crear un nuevo comentario

    let newComm = document.getElementById('commentUsuario');
    let starComm = document.getElementById('clasificacion');
    let usrCommName = document.getElementById('userComment');
    let commentUser = document.getElementById('commUsr');

    function createNewComment(){

        //Datos ingresados por el usuario
        function commentUsuario(nombre, comentario, estrellitas, fechaActual){
            this.nombre=nombre;
            this.comentario=comentario;
            this.estrellitas=estrellitas;
            this.fechaActual=fechaActual;
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

//Muestra comentario en pantalla

    function newStarComment(starCount){

        let commUser = "";
        for(let i=0; i < starCount.estrellitas; i++){
            commUser += `
            <small class="text-muted"><span class="fa fa-star checked"></span></small>
            `;
        }
        return commUser;
    }

    function showComentary(){
        newCommentary.push(nuevoComentario);
        commentUser.innerHTML += `
        <div class="commentProduct">
            <div>
                <h2>`+ nuevoComentario.nombre +`<small class="text-muted">`+ newStarComment(nuevoComentario) +`</small>`+ `</h2>
            </div>
            <br>
            <div>
                <small>`+ nuevoComentario.comentario +`</small>
            </div>
            <br>
            <div>
                <small>`+ nuevoComentario.fechaActual +`</small>
            </div>
        </div>`
    }