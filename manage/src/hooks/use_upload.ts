export const useUpload = () => {
  /**
   * 上传文件
   * @param file 文件对象
   * @param url 上传地址
   * @param data 上传数据
   * @param onProgress 上传进度回调
   * @param onSuccess 上传成功回调
   * @param onError 上传失败回调
   */
  const uploadFile = (
    file: File,
    url: string,
    data: any,
    onProgress: (progress: number) => void,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ): void => {
    const formData = new FormData();
    formData.append('file', file);
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        formData.append(key, data[key]);
      }
    }
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError(xhr.statusText);
      }
    };
    xhr.onerror = () => {
      onError(xhr.statusText);
    };
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(event.loaded / event.total);
      }
    };
    xhr.send(formData);
  }
  return { uploadFile };
}