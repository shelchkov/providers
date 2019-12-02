# providers

App for paying for your phone.

check out [Demo](http://bravedevs.epizy.com/ "Demo").

List of providers:

![Providers](https://raw.githubusercontent.com/shelchkov/providers/master/examples/providers.PNG)

Form for phone and amount:

![Megafon](https://raw.githubusercontent.com/shelchkov/providers/master/examples/megafon.PNG)

All provided data will be checked once you hover over "Submit" button. You can see fields containing errors being outlined. Also it shows error messages under fields.

![Error](https://raw.githubusercontent.com/shelchkov/providers/master/examples/error.PNG)

All server requests are emulated. Request takes from .9 to 2 seconds to return result. In case of success user redirects to providers list, otherwise there will be shown error message under the button.

## How to run locally

1. Clone this repo.
2. Run `npm install`.
3. Run `npm start`.
