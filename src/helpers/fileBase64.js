
export const fileBase64 = async (file) => {
    return new Promise((resolve, reject) => {
        if (file) {

            let fileReade = new FileReader();

            fileReade.readAsDataURL(file);

            fileReade.onload = (() => {
                resolve(fileReade.result)
            });
            fileReade.onerror = ((error) => {
                reject(error)
            })

            return;
        }
        resolve('')
    });
};