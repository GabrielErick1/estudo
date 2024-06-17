export function routPath(path) {
    const routParamsRegex = /:([a-zA-Z]+)/g;
    const pathWithParams = path.replaceAll(routParamsRegex, '(?<$1>[a-zA-Z0-9-_]+)');
   
    const pathRegex = new RegExp(`^${pathWithParams}`);


    return pathRegex;
}
