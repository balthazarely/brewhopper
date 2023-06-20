export function convertToGeoJSON(dataArray: any, filterType: string) {
  const features = dataArray
    .filter((brew: any) => brew.type === filterType)
    .map((obj: any) => {
      const {
        _id,
        user,
        name,
        description,
        type,
        address,
        lat,
        long,
        website,
        phone_number,
        check_in_code,
        beers,
        __v,
        createdAt,
        updatedAt,
      } = obj;

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
        properties: {
          _id,
          user,
          name,
          description,
          type,
          address,
          website,
          phone_number,
          check_in_code,
          beers,
          __v,
          createdAt,
          updatedAt,
        },
      };
    });

  const featureCollection = {
    type: "FeatureCollection",
    features,
  };

  return featureCollection;
}
