import { v4 as uuidv4 } from "uuid";                            

export class uuid{
    generate(){
        return uuidv4();
    }
}

export default new uuid();