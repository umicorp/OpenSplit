import {User} from "../models/Model";

export async function apiFindByPk(model, id) {
    const response = await User.findByPk(id);
    console.log(response);
    return response;
    }
