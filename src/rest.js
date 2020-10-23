const baseUrl = "http://migration-helper.net:22568/"

function encodeQueryData(data) {
    const ret = [];
    for (let d in data)
      ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}

export async function getRecommendation(fromLib, page, size) {
    const response = await fetch(baseUrl + "?" + encodeQueryData({
        "fromLib": fromLib,
        "page": page,
        "size": size,
    }));

    const rec = await response.json(); //extract JSON from the http response
    
    return rec;
}
