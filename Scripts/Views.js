var RijkViews = {
    jumbotronLoad: function(headerLabel, headerValue, leadText) {
        var jumbotron = $(".jumbotron");
        var headerLabelHtml = '<i>_the ' + headerLabel +  ':&nbsp;&nbsp;&nbsp;</i>'
        jumbotron.find("h1").html(headerLabelHtml + headerValue);
        jumbotron.find(".lead").text(leadText);
    },

    /*jumbotronLoad: function(headerText, titleText) {
        var jumbotron = $(".jumbotron");
        jumbotron.find("h1").html('<i>_the schilder:&nbsp;&nbsp;&nbsp;</i>' + headerText);
        jumbotron.find(".lead").text(titleText);
    },
    PaintingDetails*/

    schilderWorksView: function(schilderName, schilderWorksContainer) {
        var callBack = function(data) {
            data.artObjects.forEach(function(artObject){
                var artObjectContainer = $('<a class="art-object-container-link"></a>');
                artObjectContainer.load("Views/SchilderWork.html", function(){
                    $(this).find(".web-image").attr("src", artObject.webImage.url);
                    $(this).find(".long-title").text(artObject.longTitle);
                    $(this).find(".object-number").val(artObject.objectNumber);
                    
                    var href = "PaintingDetails.html?objectNumber=" + artObject.objectNumber;
                    href += "&schilderName=" + schilderName;
                    artObjectContainer.attr("href", href);
                });
                schilderWorksContainer.append(artObjectContainer);
            });
        }
        MD.getSchilderWorks(schilderName, callBack);
    },

    spyContentLoad: function (spyContentUL, spyNavUl, carouselCont) {
        var spyContentLIs = "", schildersGroupUl, schildersGroupUlLi;

        $.getJSON("Scripts/Schilders.json", function(data){
            data.Schilders.sort();

            var abcArr = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 
                'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
                
            
            // ---  spy-content-ul   build -------------------------------------------------------------------------------
            for (let i = 0; i < abcArr.length; i++) {
                var letter = abcArr[i];
                spyContentLlBuild(data, letter);
                //paintingCarouselLoad(data.Schilders, letter, carouselCont);
            }

            function spyContentLlBuild(data, letter) {
                
                schildersGroupUl = $('<ul class="schilders-group-ul"></ul>');

                // --- spy-content-li (A,B,C,...)   build ----------------------------------------------------------
                for (let j = 0; j < data.Schilders.length; j++) {
                    if (data.Schilders[j].charAt(0) == letter) {
                        var schildeerLinkStr = '<a href="SchilderWorks.html?schilderName=' +
                            data.Schilders[j].replaceAll(' ', '+') + '"><span>' + data.Schilders[j] + '</span></a>';
                        schildersGroupUlLi = $("<li></li>").append(schildeerLinkStr);
                        schildersGroupUl.append(schildersGroupUlLi);
                    }
                }

                if (schildersGroupUl.children().length > 0) {
                    var spyContentSec = $('<section class="spy-content-sec"></section>');
                    var spyContentSecH3 = '<h3 class="spy-content-sec-h" id="NavLink_' + letter + '">' + letter + '</h3>';
                    spyContentSec.append(spyContentSecH3).append(schildersGroupUl);
                    var spyContentUlLi = $('<li class="spy-content-ul-li"></li>').append(spyContentSec);
                    spyContentUL.append(spyContentUlLi);
                }
                else {
                    spyNavUl.find(".nav-link:contains('" + letter + "')").addClass("disabled");
                }
            }

            function paintingCarouselLoad(schilders, letter, carouselCont) {
                var fltSchilders = schilders.filter(schilder => schilder.charAt(0) == letter);
                var schilderName; 
                for (let i = 0; i < fltSchilders.length; i++) {
                    schilderName = fltSchilders[i];
                    MD.getSchilderWorks(schilderName, callBack);
                }

                function callBack(data) {
                    var artObject = data.artObjects[0];
                    var isFirst = true;

                    if (artObject != undefined) {
                        var imageUrl = artObject.webImage.url;

                        var carouselIitemStr = `<div class="carousel-item">
                        <img class="d-block carousel-img" src="` + imageUrl + `" ></div >`;
                        var carouselIitem = $(carouselIitemStr);

                        if (isFirst) {
                            carouselIitem.addClass("active");
                            isFirst = false;
                        }

                        carouselCont.append(carouselIitem);
                    }
                }
            }

        }).fail(function(){
            console.log("An error has occurred.");
        });
    },

    paintingDetailsLoad: function(objectNumber, paintingDetailsFs, callBack) {
        MD.getPaintingDetails(objectNumber, function(data) {
            var artObject = data.artObject;

            paintingDetailsFs.find("#WebImage").attr("src", artObject.webImage.url);
            paintingDetailsFs.find("#Description").text(artObject.label.description);
            paintingDetailsFs.find("#PhysicalMedium").val(artObject.physicalMedium);

            callBack(artObject.longTitle);
            
        });
        
    },

    moreDetailsLinkLoad: function(link, objectNumber) {        
        link.attr("href", MD.getMoreDetailsLink() + objectNumber + "/catalogue-entry");
        apiNlEnUrl
    }
}