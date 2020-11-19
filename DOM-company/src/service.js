import { company } from './department.json';
import { personnel } from './personnel.json';



export const getDepartments = () => {
    return company;
};

export const getPersonnel = () => {
    return personnel;
};