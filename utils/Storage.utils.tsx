import { Buffer } from "buffer";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../database/firebase";

async function uploadFile(fileName: string, logoFile:File, contentType: string, storageFolder: string) {
  const options = { contentType }
  let url = "";
  // return Storage.put(`${storageFolder}/${fileName}`, await convertBase64ToBlob(base64data), options);
  const storageRef = ref(storage, `${storageFolder}/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, logoFile);  
  uploadTask.on("state_changed",
  (_snapshot) => {
    
  },
  (error) => {
    alert(error);
  },
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log("downloadURL",downloadURL);
      url = downloadURL;
   })
  })
  return url
}

function generateEncodedURL(request: any) {
  const buff = new Buffer(JSON.stringify(request));
  const base64data = buff.toString("base64");
  // return Config.imageHandler.IMAGE_HANDLER_API_ENDPOINT + "/" + base64data;
  
}

async function convertBase64ToBlob(strBase64: string) {
  const res = await fetch(strBase64)

  return res.blob()
}




class StorageUtils {

  async getUrlImage(fileName: string,logoFile:File,  base64data: string) {
    const result = await uploadFile(fileName, logoFile, base64data, "upload");
    return result;
  }

}

export default new StorageUtils();

