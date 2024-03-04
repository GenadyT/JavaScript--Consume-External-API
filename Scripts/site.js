function pageScrollTop() {
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            ScrollTopBtn.style.display = "block";
        } else {
            ScrollTopBtn.style.display = "none";
        }
    }
    
    window.onscroll = function() {scrollFunction()};

    this.topFunction = function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    $("body").append('<button onclick="pageScrollTopObj.topFunction()" id="ScrollTopBtn" title="Go to top">Top</button>');
}