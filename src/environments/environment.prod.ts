export const environment = {
  production: true,
  apiKey:  process.env["API_KEY"] || 'yMAsM2KSxl7c4CXFnj9vbVgbI3CYMq3Y',
  apiAutoCompleteSearch: process.env["API_AUTOCOMPLETE"] || 'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
  apiCurrentCondition: process.env["API_CURRENTCONDITION"] || 'http://dataservice.accuweather.com/currentconditions/v1/',
  apiNext12Hours: process.env["API_NEXT12HOURS"] || 'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/'
};
