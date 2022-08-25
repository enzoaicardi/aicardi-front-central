
// basic paths

const centralUrl = typeof aiLocalMode === 'undefined' ? 'https://central.aicardi.pro/' : 'http://127.0.0.1:3334/';
const assetsUrl = centralUrl + 'assets/';
const mediasUrl = assetsUrl + 'medias/';
const imgUrl = mediasUrl + 'img/';

// assets vars

export const aiLogo = {
    transparency: getLogo('aicardi.pro-transparency.svg')
}

// assets functions

export function getLogo(filename){
    return imgUrl + 'logos/' + filename;
}