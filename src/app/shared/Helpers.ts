export const objToQueryString = function(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
    }
  return str.join('&');
};

export const extractToken = function() {
  const jwtAuth = JSON.parse(localStorage.getItem('jwtAuth'));
  if (jwtAuth != null) {
    return jwtAuth.access_token;
  }
  return null;
};

export class BFormState {
  constructor(public valid?: boolean, public message?: any) {}
}

export const fileIsImage = file => {
  return file.type && file.type.split('/')[0] == 'image';
};

export const filterObjectProperties = (props, obj) => {
  return Object.entries(obj).reduce((obj, [key, val]) => {
    if (props.includes(key)) obj[key] = val;
    return obj;
  }, {});
};
