///<reference types="../@types/jquery" />


'use strict'

$(document).ready(function () {
    
    console.log("Ready");
    $(".loader").slideUp(2000);
    $("section.mainly").slideDown(2250, function () {
        changingColorDiv.slideDown(100);
    });
    


    const controlNav = $("nav .controlNav");
    const navbar = $("nav");
    const navbarWidth = $("nav").outerWidth();
    const homeSection = $("div#home");
    const h2Slider = $(".slideDiv h2");
    const navbarItems = $("nav ul a");
    const textareaMessage = $("#contact textarea");
    const validateMessage = $(".validateMessage");
    const backButton = $(".backButton");
    const changingColorDiv = $(".changingColor");
    const colorSlider = $(".changingColor .colorSlider");
    const changingColorSpans = $(".changingColor span");
    const daysParagraph = $(".days");
    const hoursParagraph = $(".hours");
    const minutesParagraph = $(".minutes");
    const secondsParagraph = $(".seconds");


    changingColorDiv.animate({ right: -changingColorDiv.outerWidth() }, 0);
    navbar.animate({ left: -navbarWidth }, 0);

    

    (function() {
        changingColorSpans.eq(0).css("backgroundColor", "black")
        changingColorSpans.eq(1).css("backgroundColor", "green")
        changingColorSpans.eq(2).css("backgroundColor", "blue")
        changingColorSpans.eq(3).css("backgroundColor", "yellow")
        changingColorSpans.eq(4).css("backgroundColor", "red")
    })()

    colorSlider.on("click", function () {
        if (changingColorDiv.css("right") == "0px")
        {
            changingColorDiv.animate({ right: -changingColorDiv.outerWidth() }, 500 );
        }
        else
        {
            changingColorDiv.animate({ right: 0 }, 500 );
        }
    })


    changingColorSpans.on("click", function () {
        const color = $(this).css("backgroundColor");
        $("h1, p, q, span").css("color", color);
    })



    navbarItems.on("click", function (event) {
        event.preventDefault();
        const destinationID = $(this).attr("href");
        $("html, body").animate({scrollTop : $(destinationID).offset().top }, 1250);
        console.log($(destinationID).offset().top);
        console.log($(destinationID));
    })

    h2Slider.on("click", function () {
        h2Slider.not(this).next().slideUp(500);
        $(this).next().slideToggle(500);
    })




    controlNav.on("click", function () {
        if (navbar.css("left") == "0px")
        {
            navbar.animate({ left: -navbarWidth }, 750);
        }
        else
        {
            navbar.animate({ left: 0 }, 750);
        }
    })


    $(window).on("scroll", function () {
        if (controlNav.offset().top >= (homeSection.outerHeight() - controlNav.outerHeight()))
        {
            controlNav.css("color", "blue");
        }
        else
        {
            controlNav.css("color", "white");
        }

        if ($(window).scrollTop() >= (0.5 * homeSection.outerHeight()))
        {
            backButton.slideDown(250);
            backButton.css("display", "grid")
        }
        else
        {
            backButton.slideUp(250);
        }
    })



    let remainingLetters = 1;
    textareaMessage.on("input", function () {
        let cartoona;
        const lengthOfInput = $(this).val().trim().length;
        if (lengthOfInput <= 100)
        {
            remainingLetters = 100 - lengthOfInput;
            cartoona =
                `
                    <p class="validateMessage"><span>${remainingLetters}</span> character remaining</p>
                `
            validateMessage.html(cartoona);
        }
        else
        {
            remainingLetters = 100 - lengthOfInput;
            cartoona =
                `
                    <p class="validateMessage">
                        <span class="d-block">You shouldn't exceed 100 character!!</span>
                        <span>${remainingLetters} exceeded character</span>
                    </p>
                `
            validateMessage.html(cartoona);
        }
    })


    backButton.on("click", function () {
        $("html, body").animate({ scrollTop: 0 }, 750);
    })




    const waitedDate = new Date(2030, 1, 1, 0, 0, 0);
    function calculateTime() {
        const dateNow = new Date();

        const subtract = (waitedDate.getTime() / 1000 - dateNow.getTime() / 1000);

        const numOfDays = Math.floor(subtract / (3600 * 24));
        const numOfHours = Math.floor((subtract - (numOfDays * 24 * 3600)) / 3600);
        const numOfMinutes = Math.floor((subtract - (numOfDays * 24 * 3600) - (numOfHours * 3600)) / 60);
        const numOfSeconds = Math.floor(subtract - (numOfDays * 24 * 3600) - (numOfHours * 3600) - (numOfMinutes * 60));


        daysParagraph.html(`${numOfDays} d`);
        hoursParagraph.html(`${numOfHours} h`);
        minutesParagraph.html(`${numOfMinutes} m`);
        secondsParagraph.html(`${numOfSeconds} s`);

    }


    setInterval(function () {
        /* console.log("Done"); */
        calculateTime();
    }, 1000);
})