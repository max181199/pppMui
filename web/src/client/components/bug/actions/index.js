const AddPhotos = (newValue) => {
    return {
      type: 'ADD_PHOTOS',
      payload: newValue
    };
  };

  const DropPhotos = () => {
    return {
      type: 'DROP_PHOTOS',
    };
  };

export {
    AddPhotos,
    DropPhotos
}