//Información del producto
fetch(PRODUCT_INFO_URL)
    .then(response => response.json())
    .then(info => {
        //muestra en pantalla la información del producto
       let showProductInfo = document.getElementById("contenedorInfo");
       showProductInfo.innerHTML = `
        
       <div id="container-productInfo">
            <div>
                <h3 class="title">`+ info.name +`</h3>
            </div>

            <div>
                <p>` + info.description +`</p>
            </div>

            <div>
                <p>`+ info.soldCount +` articulos</p>
            </div>

            <div>
                <p class="costo">`+ info.cost + " " + info.currency +` </p>
            </div> 
       </div>

        `
    });

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


//Comentarios del producto

fetch(PRODUCT_INFO_COMMENTS_URL)
    .then(response => response.json())
    .then(commentProd => {
        //muestra en pantalla la información del producto
       let showComments = document.getElementById("contenedorComments");
       showComments.innerHTML = `
        
            <div class="commentProduct">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">
                            <div class="score-comment">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                            </div>
                            <div>
                                <h3 class="mb-1">`+ commentProd[0].user +`</h4>
                            </div><br>
                            <div>
                                <small class="text-muted">` + commentProd[0].description +`</small>
                            </div><br>
                            <div>
                                <small class="text-muted">`+ commentProd[0].dateTime +`</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commentProduct">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">
                            <div class="score-comment">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                            </div>
                            <div>
                                <h3 class="mb-1">`+ commentProd[1].user +`</h4>
                            </div><br>
                            <div>
                                <small class="text-muted">` + commentProd[1].description +`</small>
                            </div><br>
                            <div>
                                <small class="text-muted">`+ commentProd[1].dateTime +`</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commentProduct">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">
                            <div class="score-comment">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                            </div>
                            <div>
                                <h3 class="mb-1">`+ commentProd[2].user +`</h4>
                            </div><br>
                            <div>
                                <small class="text-muted">` + commentProd[2].description +`</small>
                            </div><br>
                            <div>
                                <small class="text-muted">`+ commentProd[2].dateTime +`</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="commentProduct">
                <div class="list-group-item">
                    <div class="row">
                        <div class="col">
                            <div class="score-comment">
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                            </div>
                            <div>
                                <h3 class="mb-1">`+ commentProd[3].user +`</h4>
                            </div><br>
                            <div>
                                <small class="text-muted">` + commentProd[3].description +`</small>
                            </div><br>
                            <div>
                                <small class="text-muted">`+ commentProd[3].dateTime +`</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    })



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
}); 