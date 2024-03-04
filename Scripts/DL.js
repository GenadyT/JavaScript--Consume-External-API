var DL = {

    "cmt10": "------------------- API Connections --------------------------",
    tokenKey: "6xIyvIcm",
    ApiNlApiUrl: "https://www.rijksmuseum.nl/api/nl/collection",
    ApiNlEnUrl: "https://www.rijksmuseum.nl/en/collection",
    "cmt11": "-------------------------------------------------------------",

    ajaxCall: function(method, dataType, url, successCallback) {
        $.ajax({
            method: method,
            dataType: dataType,
            //crossDomain: true,
            url: url,
            success: function (data, textStatus, jqXHR) {
                // When AJAX call is successfuly
                console.log('AJAX call successful.');
                console.log(data);
                //-----------------------------------
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                // When AJAX call has failed
                console.log('AJAX call failed.');
                console.log(textStatus + ': ' + errorThrown);
            },
            complete: function () {
                // When AJAX call is complete, will fire upon success or when error is thrown
                console.log('AJAX call completed');
            }
            /*,
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", strA, uthorization);
            }*/
        });
    },

    rijksmuseumAjaxCall_1: function (strQuery, successCallback) {
        var urlBasic = this.ApiNlApiUrl + "?key=" + this.tokenKey + "&";
        this.ajaxCall("GET", "json", urlBasic + strQuery, successCallback);
    },

    rijksmuseumAjaxCall_2: function (objectNumber, successCallback) {
        var url = this.ApiNlApiUrl + "/" + objectNumber + "?key=" + this.tokenKey + "&culture=en";
        this.ajaxCall("GET", "json", url, successCallback);
    },

    rijksmuseumPage: function (pageUrl, successCallback) {
        //this.ajaxCall("GET", "html", pageUrl, successCallback);
        /*$.ajax({
            url:pageUrl,
            type:'GET',
            success: function (data, textStatus, jqXHR) {
                successCallback(data);
            }
         });*/

        /*$("<iframe id='iframe_temp'></iframe>").appendTo("body").attr("src", pageUrl).on("load", function() {
            successCallback($(this).contents());
            $("body").remove("#iframe_temp");
        });*/
    },

    getUrlParameter: function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }
}



