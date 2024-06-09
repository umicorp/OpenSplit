export const uppercaseName = (name:string):string => {
    return name[0].toUpperCase() + name.substr(1).toLowerCase();
};

export const delay = (ms:number) => new Promise(res => setTimeout(res, ms));
