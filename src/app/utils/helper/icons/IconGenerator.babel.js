import $ from 'jquery';
import Logger from 'babel/utils/logging/Logger';

const SVG_WRAPPER_ID = 'icon-symbols';
const _logger = new Logger({source: 'IconGenerator'});

const _onError = function onError(err) {
  _logger.logMessage({
    type: 'error',
    error: err
  });
};

const _icons = {
  facebook: {
    id: 'icon-facebook',
    html: '<svg class="icon icon-facebook"><use xlink:href="#icon-facebook"></use></svg>',
    viewBox: '0 0 1024 1024',
    path: 'M554.667 426.667h128v128h-128v298.667h-128v-298.667h-128v-128h128v-53.547c0-50.731 15.957-114.816 47.701-149.845 31.744-35.115 71.381-52.608 118.869-52.608h89.429v128h-89.6c-21.248 0-38.4 17.152-38.4 38.357v89.643z'
  },
  link: {
    id: 'icon-link',
    html: '<svg class="icon icon-link"><use xlink:href="#icon-link"></use></svg>',
    viewBox: '0 0 1024 1024',
    path: 'M402.381 752.179l-41.472 41.216c-35.891 35.584-94.362 35.584-130.304 0-17.203-17.101-26.675-39.885-26.675-64.102s9.523-46.899 26.675-64.102l152.576-151.296c31.59-31.386 91.085-77.568 134.451-34.56 19.917 19.763 52.019 19.661 71.834-0.256 19.712-19.917 19.61-52.070-0.307-71.782-73.626-73.114-182.579-59.597-277.453 34.56l-152.576 151.347c-36.608 36.301-56.73 84.685-56.73 136.090 0 51.507 20.173 99.789 56.73 136.090 37.683 37.376 87.142 56.115 136.653 56.115s99.021-18.688 136.653-56.115l41.523-41.216c19.917-19.712 20.019-51.814 0.256-71.68-19.814-19.866-51.917-19.968-71.834-0.307zM864.819 164.198c-79.206-78.541-189.901-82.79-263.117-10.086l-51.661 51.302c-19.917 19.763-20.070 51.866-0.307 71.731 19.763 19.917 51.866 20.019 71.782 0.256l51.712-51.251c37.888-37.683 87.603-22.067 120.115 10.086 17.203 17.152 26.726 39.885 26.726 64.102s-9.523 46.95-26.726 64.051l-162.816 161.485c-74.445 73.779-109.363 39.219-124.262 24.422-19.917-19.763-52.019-19.61-71.731 0.256-19.763 19.917-19.661 52.070 0.256 71.731 34.202 33.894 73.216 50.688 114.074 50.688 50.022 0 102.912-25.19 153.242-75.11l162.816-161.434c36.454-36.352 56.678-84.685 56.678-136.090 0-51.456-20.224-99.789-56.781-136.141z'
  },
  participate: {
    id: 'icon-participate',
    html: '<svg class="icon icon-participate"><use xlink:href="#icon-participate"></use></svg>',
    viewBox: '0 0 1024 1024',
    path: 'M810 554h-256v256h-84v-256h-256v-84h256v-256h84v256h256v84z'
  },
  twitter: {
    id: 'icon-twitter',
    html: '<svg class="icon icon-twitter"><use xlink:href="#icon-twitter"></use></svg>',
    viewBox: '0 0 1024 1024',
    path: 'M805.973 299.179c34.475-21.163 57.301-50.048 68.48-86.784-33.536 17.792-66.944 29.995-100.309 36.736-29.995-32.256-67.968-48.64-113.493-48.64-44.501 0-82.091 15.616-112.768 45.995-30.507 30.592-45.909 67.755-45.909 111.147 0 13.184 1.664 24.96 4.992 34.944-131.243-4.48-239.872-58.923-325.461-163.712-14.507 25.643-21.76 51.755-21.76 78.763 0 55.509 23.424 99.499 70.187 131.797-26.667-2.261-50.176-9.003-70.187-20.053 0 39.637 11.648 72.747 34.987 101.888 23.424 28.843 53.504 47.232 90.24 55.083-13.312 3.413-27.349 5.035-41.771 5.035-13.312 0-22.741-1.109-28.331-3.541 9.813 32.299 28.331 58.496 55.083 78.549 26.667 20.139 57.344 30.763 91.819 31.701-56.832 44.587-121.813 66.645-195.328 66.645-18.005 0-30.763-0.256-38.485-1.621 72.405 47.019 153.003 70.357 242.176 70.357 91.264 0 171.904-23.125 242.091-69.376 70.187-45.995 121.984-102.741 155.264-169.557 33.451-66.731 50.005-136.192 50.005-208.725v-19.968c32.341-24.32 58.496-51.712 78.507-81.963-29.013 12.501-59.008 20.992-90.027 25.301z'
  }
};

// Alias List
_icons.bitly = _icons.link;

const _loadSymbol = function loadSymbol(iconObj) {
  if ($('#' + SVG_WRAPPER_ID).length === 0) {
    $('body').append('<svg id="' + SVG_WRAPPER_ID + '" style="position: absolute; width: 0; height: 0;" width="0" height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs></svg>');
  }

  const svgNS = 'http://www.w3.org/2000/svg';
  const path = document.createElementNS(svgNS,'path');

  const symbol = document.createElementNS(svgNS,'symbol');

  path.setAttribute('class', 'path1');
  path.setAttribute('d', iconObj.path);
  symbol.setAttribute('id', iconObj.id);
  symbol.setAttribute('viewBox', iconObj.viewBox);

  symbol.appendChild(path);
  document.getElementById(SVG_WRAPPER_ID).getElementsByTagName('defs')[0].appendChild(symbol);
};

export const getIcon = function getIcon(icon) {

  const iconObj = _icons[icon];

  if (iconObj) {
    _loadSymbol(iconObj);

    return iconObj.html;
  } else {
    _onError('"icon-' + icon + '" is not available');
    return;
  }

};

export default getIcon;
