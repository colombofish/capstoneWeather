console.log('hi from ejs');
if (typeof (cityName) !== 'undefined') {
  const selectElement = document.getElementById('form-select');
  selectElement.value = cityName // This to set the selected item on the display
}