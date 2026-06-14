export const GetApiErrorMessage = (error) => {
  let messages = [];
  const message = error?.response?.data?.message || error?.message || 'Error Message';
  messages.push(message);

  const errData = error?.response?.data?.error || error?.response?.data?.errors;
  if (errData) {
    if (typeof errData === 'object' && errData !== null) {
      let values = Object.values(errData);

      values.forEach((value) => {
        if (Array.isArray(value)) {
          messages.push(...value);
        } else if (typeof value === 'string') {
          messages.push(value);
        } else {
          messages.push(JSON.stringify(value));
        }
      });
    } else if (typeof errData === 'string') {
      messages.push(errData);
    }
  }

  return messages.join(' || ');
};

export const GetApiResponseMessage = (response) => {
  const message = response?.data?.message || response?.message || 'Response Message';
  return message;
};
