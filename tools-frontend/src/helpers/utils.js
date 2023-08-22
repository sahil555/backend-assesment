import { Cookies } from "react-cookie";
const cookies = new Cookies();
export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // aakash 123 => aakash%2020123

    formBody.push(encodedKey + "=" + encodedValue);
  }

  return formBody.join("&"); // 'username=aakash&password=123213'
}
// to convert base64 image into file
export function b64toBlob(b64Data, contentType, sliceSize, imageName) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  blob.lastModifiedDate = new Date();
  // to add name property in Blob file
  blob.name = imageName;
  // to convert Blob file into File type
  blob = new File([blob], imageName);
  return blob;
}
export function getAuthAccessTokenFromCookie() {
  return cookies.get("access_token");
}
export function getAuthRefreshTokenFromCookie() {
  return cookies.get("refresh_token");
}
export function removeAuthAccessTokenFromCookie() {
  return cookies.remove("access_token");
}
export function removeAuthRefreshTokenFromCookie() {
  return cookies.remove("refresh_token");
}
