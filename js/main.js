let rowData = document.getElementById("rowData");
let rowcont = document.querySelector(".roww-cont")




 
$(document).ready(() => {
    $(".inner-loading-screen").fadeOut(1500, function() {
        getMovies();
        $(".search").removeClass("d-none")
        // $(".error-name").addClass("d-none")
    });
});



$(".search").on("input" , (e) => {
    getSearchMovies(e.target.value);
    if(e.target.value ==""){
        getMovies()
    }
})

// $(document).ready(() => {
//     // getMovies().then(() => {


//     // })
//     $(".inner-loading-screen").fadeOut(2000)




// })

// setTimeout(getMovies() , 2000);



function goToTop(){
    // $(".links ul li").click(() => {
    //     $("html,body").animate({scrollTop:0} , 1500)
    //     console.log("helooooooooooooo");
    //     // $("body").scrollTop(0)
    // })
  $("html,body").animate({scrollTop:0} , 600)

}


function openSideNav(){
    $(".side-nav-menu").animate({left : 0 } ,500)
    $(".open-close-icon").removeClass("fa-align-justify")     
    $(".open-close-icon").addClass("fa-x")     
    $(".open-close-icon").css({"font-size" : "20px"})     
    
    for (let i = 0; i < 6; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i+3)*200)
    }
}

function closeSideNav(){
    $(".side-nav-menu").animate({left : -250 } ,500)
    $(".open-close-icon").removeClass("fa-x")
    $(".open-close-icon").addClass("fa-align-justify")
    $(".open-close-icon").css({"font-size" : "25px"})     

    for (let i = 0; i < 6; i++) {
        $(".links li").eq(i).animate({
            top: 400
            } )  
    }
}


$(".open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})


async function getMovies(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let data = await response.json()
    // console.log(data);
    displayDiscoverMovies(data.results)    
    
}
 


async function getSearchMovies(word){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${word}&api_key=eba8b9a7199efdcb0ca1f96879b83c44`)
    let data = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results)
}



async function getNowPlayingMoves(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data  = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results)
}
// function getNowPlayingMoves2(){
//     setTimeout(getNowPlayingMoves ,1000)
// }

async function getPopularMovies(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data  = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results)
}

async function getTopRated(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data  = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results)
}


async function getTrending(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data  = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results) 
}

async function getUpComing(){
    rowData.innerHTML = "";
    let response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44`);
    let data  = await response.json()
    console.log(data);
    displayDiscoverMovies(data.results) 
}


function displayDiscoverMovies(arr){
    let cartoona =``
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class=" col-lg-4 col-md-6 col-sm-12 text-white ">
                <div class="movie-card position-relative overflow-hidden rounded-2 ">
                    <img class="w-100" src="https://image.tmdb.org/t/p/w500${arr[i].poster_path}" alt="" >
                    <div class="movie-card-layer position-absolute text-start d-flex flex-column align-items-center  p-2">
                        <div class = " card-title-div">
                            <h3 class = "card-title mt-3 " style =" font-size : 35px; font-weight : bold "  >${arr[i].original_title}</h3>
                        </div>        

                        <div class  = " mt-4 "> 
                            <p class = " card-overview   text-start" style =" font-size : 16px;"  >${arr[i].overview}</p>
                            <p class = " card-date text-start" >${arr[i].release_date}</p>
                            <p class = " card-stars text-start" >${checkMovieAverageStars(arr[i])}</p>
                            <h5 class = " card-vote d-flex justify-content-center align-items-center   text-start  border-1 border border-info rounded-circle" style = "width:40px; height:40px; font-size: 18px; font-weight : lighter; " >${arr[i].vote_average.toFixed(1) }</h5>
                        </div>        
                    </div>
                </div>
        </div>

        
        `

    }
    let searchDiv = `<input type="search" placeholder="Search" class=" search mt-4  form-control w-50 mx-auto bg-transparent rounded-pill text-white  shadow-none border-white px-3">`
    let contactSection = `<section id="contactus" class=" mt-5 contact container text-white py-5">
                    <h2>Contact US</h2>
                    <form>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <input type="text" required="" id="name" maxlength="37" class="form-control mt-4" placeholder="Enter Your Name">
                                <span class="error-name text-danger d-none">Invalid Name , only Characters allowed</span>
                            </div>
                            <div class="col-md-6">
                                <input type="email" required="" id="email" class="form-control mt-4" placeholder="Enter Your Email">
                                <span class="error-email text-danger d-none">Invalid Email , try example@domain.com</span>
                            </div>
                            <div class="col-md-6">
                                <input type="text" required="" id="phone" class="form-control mt-4" placeholder="Enter Your Phone">
                                <span class="error-phone text-danger d-none">Invalid Phone Number</span>
                            </div>
                            <div class="col-md-6">
                                <input type="text" required="" id="age" class="form-control mt-4" placeholder="Enter Your Age">
                                <span class="error-age text-danger d-none ">Your age must be over 16+</span>
                            </div>
                            <div class="col-md-6 position-relative">
                                <input type="password" required="" id="password" class="form-control mt-4" placeholder="Enter Your Password">
                                <span class="error-pass text-danger d-none">password must contain numbers & letters at least 8 character</span>
                                <span class="showPass" style="opacity: 0; bottom: -20px;"><i data-show="show" class="fa-solid fa-eye-slash"></i></span>
                            </div>
                            <div class="col-md-6">
                                <input type="password" required="" id="repassword" class="form-control mt-4" placeholder="ReEnter Password">
                                <span class="error-repass text-danger d-none">Password not match</span>
                            </div>
                            <div class="col-md-12  mt-4">
                                <button type="submit" class="form-btn rounded-2 mb-3 ">Submit</button>
                            </div>
                        
                    </div></form>
                </section>`;

    rowData.innerHTML =  cartoona +contactSection ;
       
    cardHoverAnimations();
    inputsValidation(); 
   

}





function cardHoverAnimations(){
    $(document).on("mouseenter", ".movie-card", function() {
        // console.log("mouse enter on: ", $(this));
        $(this).find(".movie-card-layer").css({"opacity":"1","display":"block"})
        $(this).find(".movie-card-layer .card-title-div .card-title").addClass("fadeDown")
        $(this).find(".movie-card-layer .card-overview").addClass("flip")
        $(this).find(".movie-card-layer .card-date").addClass("fadeUp")
        $(this).find(".movie-card-layer .card-stars").addClass("fadeUp")
        $(this).find(".movie-card-layer .card-vote").addClass("fadeUp")
        
        $(this).find(".movie-card-layer .card-title-div .card-title").removeClass("slideLeft")
        $(this).find(".movie-card-layer .card-overview").removeClass("slideLeft")
        $(this).find(".movie-card-layer .card-date").removeClass("slideLeft")
        $(this).find(".movie-card-layer .card-stars").removeClass("slideLeft")
        $(this).find(".movie-card-layer .card-vote").removeClass("slideLeft")


    });

    $(document).on("mouseleave", ".movie-card", function() {
        // console.log("mouse leave on: ", $(this));        
        $(this).find(".movie-card-layer").css({"opacity":"0","display":"none"})
        $(this).find(".movie-card-layer .card-title-div .card-title").removeClass("fadeDown")
        $(this).find(".movie-card-layer .card-overview").removeClass("flip")
        $(this).find(".movie-card-layer .card-date").removeClass("fadeUp")
        $(this).find(".movie-card-layer .card-stars").removeClass("fadeUp")
        $(this).find(".movie-card-layer .card-vote").removeClass("fadeUp")
        
        $(this).find(".movie-card-layer .card-title-div .card-title").addClass("slideLeft")
        $(this).find(".movie-card-layer .card-overview").addClass("slideLeft")
        $(this).find(".movie-card-layer .card-date").addClass("slideLeft")
        $(this).find(".movie-card-layer .card-stars").addClass("slideLeft")
        $(this).find(".movie-card-layer .card-vote").addClass("slideLeft")



    });
}



function checkMovieAverageStars(value)
{
    if(value.vote_average < 1)
    {
        return `<i class="fa-solid fa-star text-muted fs-6"></i>`;
    }
    else if(value.vote_average < 2)
    {
        return `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 3)
    {
        return `<i class="fa-solid fa-star text-warning fs-6"></i>`;
    }
    else if(value.vote_average <4)
    {
        let term = '';
        for (let i = 0; i < 1; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average <5)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term;
    }
    else if(value.vote_average <6)
    {
        let term = '';
        for (let i = 0; i < 2; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 7)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term;
    }
    else if(value.vote_average < 8)
    {
        let term = '';
        for (let i = 0; i < 3; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else if(value.vote_average < 9)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term;
    }
    else if(value.vote_average < 10)
    {
        let term = '';
        for (let i = 0; i < 4; i++) {
        term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term + `<i class="fa-regular fa-star-half-stroke text-warning fs-6"></i>`;
    }
    else
    {
        let term = '';
        for (let i = 0; i < 5; i++) {
            term += `<i class="fa-solid fa-star text-warning fs-6"></i>`;
        }
        return term;
    }
}





function contactSection(){
    rowData.innerHTML + 
    `
                    <section id="" class=" contact container text-white py-5">
                    <h2>Contact US</h2>
                    <form>
                        <div class="row mt-3">
                            <div class="col-md-6">
                                <input type="text" required="" id="name" maxlength="37" class="form-control mt-4" placeholder="Enter Your Name">
                                <span class="error-name text-danger d-none">Invalid Name , only Characters allowed</span>
                            </div>
                            <div class="col-md-6">
                                <input type="email" required="" id="email" class="form-control mt-4" placeholder="Enter Your Email">
                                <span class="error-email text-danger d-none">Invalid Email , try example@domain.com</span>
                            </div>
                            <div class="col-md-6">
                                <input type="number" required="" id="phone" class="form-control mt-4" placeholder="Enter Your Phone">
                                <span class="error-phone text-danger d-none">Invalid Phone Number</span>
                            </div>
                            <div class="col-md-6">
                                <input type="number" required="" id="age" class="form-control mt-4" placeholder="Enter Your Age">
                                <span class="error-age text-danger d-none ">Your age must be over 16+</span>
                            </div>
                            <div class="col-md-6 position-relative">
                                <input type="password" required="" id="password" class="form-control mt-4" placeholder="Enter Your Password">
                                <span class="error-pass text-danger d-none">password must contain numbers & letters at least 8 character</span>
                                <span class="showPass" style="opacity: 0; bottom: -20px;"><i data-show="show" class="fa-solid fa-eye-slash"></i></span>
                            </div>
                            <div class="col-md-6">
                                <input type="password" required="" id="repassword" class="form-control mt-4" placeholder="ReEnter Password">
                                <span class="error-repass text-danger d-none">Password not match</span>
                            </div>
                            <div class="col-md-12  mt-4">
                                <button type="submit" class="form-btn rounded-2 mb-3 ">Submit</button>
                            </div>
                        
                    </div></form>
                </section>
    `
}

// function showContacts() {
//     rowData.innerHTML = `
//     <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
//         <div class="container w-75 text-center">
//             <div class="row g-4">
//                 <div class="col-md-6">
//                     <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
//                     <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Special characters and numbers not allowed
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
//                     <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Email not valid *example@yyy.zzz
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
//                     <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Enter Valid Phone Number
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
//                     <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Enter Valid Age
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
//                     <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Enter Valid Password *Minimum eight characters, at least one letter and one number:*
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
//                     <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
//                         Enter Valid RePassword 
//                     </div>
//                 </div>
//             </div>
//             <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
//         </div>
//     </div> `
//     submitBtn = document.getElementById("submitBtn")


//     document.getElementById("nameInput").addEventListener("focus", () => {
//         nameInputTouched = true
//     })

//     document.getElementById("emailInput").addEventListener("focus", () => {
//         emailInputTouched = true
//     })

//     document.getElementById("phoneInput").addEventListener("focus", () => {
//         phoneInputTouched = true
//     })

//     document.getElementById("ageInput").addEventListener("focus", () => {
//         ageInputTouched = true
//     })

//     document.getElementById("passwordInput").addEventListener("focus", () => {
//         passwordInputTouched = true
//     })

//     document.getElementById("repasswordInput").addEventListener("focus", () => {
//         repasswordInputTouched = true
//     })
// }

function nameValidation() {
    return (/^[a-zA-z\s]{1,36}$/.test(document.getElementById("name").value))
}

function emailValidation() {
    return (/^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{3}$/.test(document.getElementById("email").value))
}

function phoneValidation() {
    return (/^(02)?(01)[0125][0-9]{8}$/.test(document.getElementById("phone").value))
}

function ageValidation() {
    return (/^(1[6-9]|[2-9][0-9]|100)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("password").value == document.getElementById("repassword").value
}


function inputsValidation() {
    $(".contact #name").on("focus" , () => {
        $(".contact #name").on("input" , (e) => {
            if (nameValidation() || e.target.value == "" ) {
                $("#name").removeClass("border-danger")
                $(".error-name").slideUp(100)
                $(".form-btn").removeClass("shake")
                $(".form-btn").css({"backgroundColor" : "inherit"})
                moveSubmitButton(false)

    
            } else {
                $("#name").addClass("border-danger")
                $(".error-name").removeClass("d-none");
                $(".error-name").fadeIn(700)
                $(".form-btn").addClass("shake")
                $(".form-btn").addClass("")
                $(".form-btn").css({"backgroundColor" : "#dc3545"})
                moveSubmitButton(true)
                }
        })})

        $(".contact #email").on("focus" , () => {
            $(".contact #email").on("input" , (e) => {
                if (emailValidation() || e.target.value == "" ) {
                    $("#email").removeClass("border-danger")
                    $(".error-email").slideUp(100)
                    $(".form-btn").removeClass("shake")
                    $(".form-btn").css({"backgroundColor" : "inherit"})
                    moveSubmitButton(false)
                } else {
                    $("#email").addClass("border-danger")
                    $(".error-email").removeClass("d-none");
                    $(".error-email").fadeIn(700)
                    $(".form-btn").addClass("shake")
                    $(".form-btn").addClass("")
                    $(".form-btn").css({"backgroundColor" : "#dc3545"})
                    moveSubmitButton(true)
                }
            })})

    

            $(".contact #phone").on("focus" , () => {
                $(".contact #phone").on("input" , (e) => {
                    if (phoneValidation() || e.target.value == "" ) {
                        $("#phone").removeClass("border-danger")
                        $(".error-phone").slideUp(100)
                        $(".form-btn").removeClass("shake")
                        $(".form-btn").css({"backgroundColor" : "inherit"})
                        moveSubmitButton(false)
            
                    } else {
                        $("#phone").addClass("border-danger")
                        $(".error-phone").removeClass("d-none");
                        $(".error-phone").fadeIn(700)
                        $(".form-btn").addClass("shake")
                        $(".form-btn").addClass("")
                        $(".form-btn").css({"backgroundColor" : "#dc3545"})
                        moveSubmitButton(true)
                    }
                })})

            $(".contact #age").on("focus" , () => {
                $(".contact #age").on("input" , (e) => {
                    if (ageValidation() || e.target.value == "" ) {
                        $("#age").removeClass("border-danger")
                        $(".error-age").slideUp(100)
                        $(".form-btn").removeClass("shake")
                        $(".form-btn").css({"backgroundColor" : "inherit"})
                        moveSubmitButton(false)
                    } else {
                        $("#age").addClass("border-danger")
                        $(".error-age").removeClass("d-none");
                        $(".error-age").fadeIn(700)
                        $(".form-btn").addClass("shake")
                        $(".form-btn").addClass("")
                        $(".form-btn").css({"backgroundColor" : "#dc3545"})
                        moveSubmitButton(true)
                    }
                })})

                $(".contact #password").on("focus" , () => {
                    $(".contact #password").on("input" , (e) => {
                        if (passwordValidation() || e.target.value == "" ) {
                            $("#password").removeClass("border-danger")
                            $(".error-pass").slideUp(100)
                            $(".form-btn").removeClass("shake")
                            $(".form-btn").css({"backgroundColor" : "inherit"})
                            moveSubmitButton(false)
                        } else {
                            $("#password").addClass("border-danger")
                            $(".error-pass").removeClass("d-none");
                            $(".error-pass").fadeIn(700)
                            $(".form-btn").addClass("shake")
                            $(".form-btn").addClass("")
                            $(".form-btn").css({"backgroundColor" : "#dc3545"})
                            moveSubmitButton(true)
                        }
                    })})

                $(".contact #repassword").on("focus" , () => {
                    $(".contact #repassword").on("input" , (e) => {
                        if (repasswordValidation() || e.target.value == "" ) {
                            $("#repassword").removeClass("border-danger")
                            $(".error-repass").slideUp(100)
                            $(".form-btn").removeClass("shake")
                            $(".form-btn").css({"backgroundColor" : "inherit"})
                            moveSubmitButton(false)
                
                        } else {
                            $("#repassword").addClass("border-danger")
                            $(".error-repass").removeClass("d-none");
                            $(".error-repass").fadeIn(700)
                            $(".form-btn").addClass("shake")
                            $(".form-btn").addClass("")
                            $(".form-btn").css({"backgroundColor" : "#dc3545"})
                            moveSubmitButton(true)
                        }
                    })})




    // if (nameValidation() || emailValidation() || phoneValidation() || ageValidation() || passwordValidation() || repasswordValidation()) {
    //     $(".form-btn").on("mouseenter" , () => {
    //         let buttonLocation =  $(".form-btn").css("marginLeft")
    //         if($(".form-btn").css("marginLeft") == "250px")
    //         {
    //             $(".form-btn").css({"marginLeft":"0px"});
    //         }
    //         else
    //         {
    //             $(".form-btn").css({"marginLeft":"250px"});
    //         }
    //     })
        
    // } 
    // else {
    //     console.log("faaaaaaaasleeeeeeeeeeeee");
    // }
    function moveSubmitButton(isInvalid) {
        if (isInvalid) {
            $(".form-btn").on("mouseenter", function() {
                let btnPosition = $(".form-btn").css("marginLeft");
                if (btnPosition === "250px") {
                    $(".form-btn").css("marginLeft", "0px");
                    $(".form-btn").css("cursor", "default");
                } else {
                    $(".form-btn").css("marginLeft", "250px");
                    $(".form-btn").css("cursor", "default");

                }
            });
        } else {
            $(".form-btn").off("mouseenter"); // Remove the event listener
            $(".form-btn").css("marginLeft", "0px"); // Reset the position
            $(".form-btn").css("cursor", "pointer");

        }
}}

inputsValidation()