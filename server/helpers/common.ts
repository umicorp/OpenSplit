import {Group} from "../models/Model";

export const getUsersinGroups = async()=> {
    const allGroups = await Group.findAll();

    const AllUsersAndGroups = []
    for (let group of allGroups){
        let usergroup = await group.getUsers({joinTableAttributes: [], attributes: ['id', "name"] })
        if (usergroup === null) usergroup = [];
        let UsersAndGroups = {group: group, users:usergroup }
        AllUsersAndGroups.push(UsersAndGroups)
    }
    return AllUsersAndGroups

}