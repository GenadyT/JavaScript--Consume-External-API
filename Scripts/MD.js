var MD = {
    queryPart111: "&role=schilder&st=Objects",
    queryPart112: "&st=Objects",

    getSchilderWorks: function(schilderName, callBack) {
        schilderName = schilderName.replaceAll(' ', '+');
        var strQuery = "involvedMaker=" + schilderName + this.queryPart111;

        return DL.rijksmuseumAjaxCall_1(strQuery, callBack);
    },

    getSchilders: function(schilderName, callBack) {
        schilderName = schilderName.replaceAll(' ', '+');
        var strQuery = "involvedMaker=" + schilderName + this.queryPart111;

        return DL.rijksmuseumAjaxCall_1(strQuery, callBack);
    },

    getEarlyNetherlandishPaintings: function(callBack) {
        var strQuery = "cctitle=Early+Netherlandish+Paintings" + this.queryPart112;

        return DL.rijksmuseumAjaxCall_1(strQuery, callBack);
    },

    getPaintingDetails: function(objectNumber, callBack) {
        return DL.rijksmuseumAjaxCall_2(objectNumber, callBack);
    },

    getMoreDetailsLink: function () {
        return DL.ApiNlEnUrl;
    }
}