import L from "leaflet";

// const myCustomColour = '#7CFC00'
// const markerHtmlStyles = `background-color: ${myCustomColour}`;
export default L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  // html: `<span style="${markerHtmlStyles}" />`,
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});
