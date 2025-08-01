const toRad = (value: number) => (value * Math.PI) / 180;

export const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // in km
};
export const getTime=(distance:number,speed:number):string=>{
  const time=distance/speed
  if(time <1){
    return `${(time * 60).toFixed(0)} min`
  }
else{
  return `${time.toFixed(2)} hrs`
}
}