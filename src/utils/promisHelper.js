const promiseHelper = (stream) => {
    return new Promise((resolve, reject) => {
      const onClose = () => {
        stream.off('error', onError);
        resolve();
      };
      const onError = (error) => {
        stream.off('close', onClose);
        reject(error);
      };
  
      stream.once('close', onClose);
      stream.once('error', onError);
    });
};

export default promiseHelper;
