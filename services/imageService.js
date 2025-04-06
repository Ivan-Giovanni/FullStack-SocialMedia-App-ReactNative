import * as FileSystem from 'expo-file-system';
import { supabase } from "../lib/supabase";
import { supabaseUrl } from "../constants/index";



export const getUserImageSrc = imagePath => {
    if (!imagePath) {
        console.log('[imageService.js].[getUserImageSrc] imagePath is not provided');
        return require('../assets/images/defaultUser.png');
    }

    // If imagePath is already a full URI, return it as is
    if (typeof imagePath === 'object' && imagePath.uri) {
        console.log('[imageService.js].[getUserImageSrc] imagePath is already a full URI: ', imagePath);
        return { 
            uri: `${supabaseUrl}/storage/v1/object/public/uploads/${imagePath.uri}` 
        };
    }

    // Otherwise, construct the full URL from the path
    console.log('[imageService.js].[getUserImageSrc] imagePath is not a full URI: ', imagePath);
    return {
        uri: `${supabaseUrl}/storage/v1/object/public/uploads/${imagePath}`
    };
}

export const getSupabaseFileUrl = filePath => {
    if(filePath) {
        return {uri: `${supabaseUrl}/storage/v1/object/public/uploads/${filePath}`}
    }
    return null;
}

export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
      let fileName = getFilePath(folderName, isImage);
      const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64
      });
      
      // Convert base64 to array buffer
      const base64ToArrayBuffer = (base64) => {
        const binary_string = atob(base64);
        const len = binary_string.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes;
      };
      
      let imageData = base64ToArrayBuffer(fileBase64); // array buffer
      
      let {data, error} = await supabase
        .storage
        .from('uploads')
        .upload(fileName, imageData, {
          cacheControl: '3600',
          upsert: false,
          contentType: isImage ? 'image/*' : 'video/*'
        });
      
      if (error) {
        console.log('[imageService.js] file upload error', error);
        return { success: false, message: '[imageService.js]could not upload media' };
      }
      
      console.log('[imageService.js] data', data);
      return { success: true, data: data.path };
    } catch (error) {
      console.log('[imageService.js] file upload error', error);
      return { success: false, message: '[imageService.js]could not upload media' };
    }
  }



export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage ? '.png' : '.mp4'}`;
}
