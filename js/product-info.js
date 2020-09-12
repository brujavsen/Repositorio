
//Información del producto
fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(info => {
        //muestra en pantalla la información del producto
       let showProductInfo = document.getElementById("contenedorInfo");
       showProductInfo.innerHTML = `
         
        <div id="container-productInfo">

            <div>
                <h2 class="title">`+ info.name +`</h2>
            </div>

            <div class="costo">
                <p>`+ info.currency + " " + info.cost +` </p>
            </div> 

            <div class="soldCount">
                <p>Cantidad: `+ info.soldCount +`</p>
            </div>

            <div class="categoryInfo">Categoria: `+info.category+`</div>

            <a class="buyPrd" href="./cart.html">Añadir al carrito<a>

        </div>

        <div id="cnt-descInfo">
            <div>
                <h2>Descripción:</h2>
                <p>` + info.description +`</p>
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
        <a href="./product-info.html?`+relProd.name+`">
            <div class="productsRel">
                <p>Productos de relevancia:</p>
                <div class="col-3">
                    <img src="` + relProd.imgSrc + `" alt="` + relProd.description + `" class="img-thumbnail">
                    <h3 class="mb-1">`+ relProd.name +`</h3>
                </div>
                
                <small class="text-muted">` + relProd.description +`</small><br>
                <small class="text-muted">`+ relProd.soldCount +` articulos</small><br>
                <small class="text-muted">`+ relProd.cost + " " + relProd.currency +` </small>
            </div>
        </a> 
        `
        for(let i=0; i < relPrd.length; i++){
            var relProd = relPrd[1]
        }

        //muestra en pantalla la información del producto
        var showRelPrd = document.getElementById('car');
        showRelPrd.innerHTML += `
        <a href="./product-info.html?`+relProd.name+`">
            <div class="productsRel">
                <div class="col-3">
                    <img src="` + relProd.imgSrc + `" alt="` + relProd.description + `" class="img-thumbnail">
                </div>
                <h3 class="mb-1">`+ relProd.name +`</h4>
                <small class="text-muted">` + relProd.description +`</small><br>
                <small class="text-muted">`+ relProd.soldCount +` articulos</small><br>
                <small class="text-muted">`+ relProd.cost + " " + relProd.currency +` </small>
            </div>
        </a> 
        `
    })


