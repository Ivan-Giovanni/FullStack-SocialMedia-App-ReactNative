export const getUserImageSrc = imagePath => {
    if (imagePath) {
        return { uri: imagePath };
    }
    else {
        return require('../assets/images/defaultUser.png');
    }
}

export const uploadFile = async (folderName, fileUri, isImage = true) => {
    try {
        let fileName = getFilePath(folderName, isImage);


    } catch (error) {
        console.log('[imageService.js] file upload error', error);
        return { success: false, message: '[imageService.js]could not upload media' };
    }
}



export const getFilePath = (folderName, isImage) => {
    return `/${folderName}/${(new Date()).getTime()}${isImage ? '.png' : '.mp4'}`;
}


