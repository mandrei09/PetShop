import { getStorage, ref, uploadBytes,getDownloadURL  } from "firebase/storage";

export class PublicFunctions {
    static async onUploadImage(image: File, path: string): Promise<string> {
        try {
          const storage = getStorage();
          const storageRef = ref(storage, path);
          const metadata = {
            contentType: 'image/jpeg',
          };
      
          const snapshot = await uploadBytes(storageRef, image, metadata);
          const downloadURL = await getDownloadURL(snapshot.ref);
      
          return downloadURL;
        } catch (error) {
          console.error('Error uploading image:', error);
          throw error;
        }
      }
      

    static async getDownloadURL(imagePath: string): Promise<string> {
        const storage = getStorage(); 
        const imageRef = ref(storage, imagePath);
        try {
          const url = await getDownloadURL(imageRef);
          return url; 
        } catch (error) {
          console.error('Error getting download URL:', error);
          throw error; 
        }
      }
       
    static isKeyInLocalStorage(key: string): boolean {
      return !!localStorage.getItem(key);
    }

    static isKeyInSessionStorage(key: string): boolean {
      return !!sessionStorage.getItem(key);
    }
    
}
