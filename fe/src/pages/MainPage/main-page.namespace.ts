import {apiInstance} from "../../api/api.index";

// this is just a namespace with function handlers to through commands to client api, to get them interact with backend api.
export const CommandHandler = async (commandsStack: string[], command: string) => {
    let newArr = commandsStack.map(i => i);
    newArr.unshift(`$: ${command}`);
    switch (command.split(' ')[0]) {
        case ('help'):
            newArr.unshift('### [ok]');
            newArr.unshift('"get {sort: name | brand | year | price} {page?} {offset?}" - get sorted info about cars');
            newArr.unshift('"create {name} {brand?} {year?} {price?}" - create record about car');
            newArr.unshift('"update {id} {name?} {brand?} {year?} {price?}" - update record about car');
            newArr.unshift('"delete {id}" - delete info about car');
            newArr.unshift('"clear" - clear terminal');
            newArr.unshift('"help" - get help');
            newArr.unshift('[example of command]"get cars price 1 42" - get sorted by price info about cars, page 1, offset 42');
            newArr.unshift('...');
            break;
        case ('clear'):
            newArr.splice(0, newArr.length - 1);
            break;
        case ('get'):
            try {
                const data = await apiInstance.getCarsList(command).then((res) => {
                    return res;
                });
                newArr.unshift('### [ok]');
                newArr.unshift(JSON.stringify(data));
                break;
            } catch (e) {
                newArr.unshift('### [error]');
                newArr.unshift(JSON.stringify(e));
                break;
            }
        case ('create'):
            try {
                const data = await apiInstance.createCar(command).then((res) => {
                    return res;
                });
                newArr.unshift('### [ok]');
                newArr.unshift(JSON.stringify(data));
                break;
            } catch (e) {
                newArr.unshift('### [error]');
                newArr.unshift(JSON.stringify(e));
                break;
            }
        case ('update'):
            try {
                const data = await apiInstance.updateCar(command).then((res) => {
                    return res;
                });
                newArr.unshift('### [ok]');
                newArr.unshift(JSON.stringify(data));
                break;
            } catch (e) {
                newArr.unshift('### [error]');
                newArr.unshift(JSON.stringify(e));
                break;
            }
        case ('delete'):
            try {
                const data = await apiInstance.deleteCar(command).then((res) => {
                    return res;
                });
                newArr.unshift('### [ok]');
                newArr.unshift(JSON.stringify(data));
                break;
            } catch (e) {
                newArr.unshift('### [error]');
                newArr.unshift(JSON.stringify(e));
                break;
            }
        default:
            newArr.unshift('### [error]: unknown command, type "help" to get list of commands.');
            break;
    }
    return newArr;
};
