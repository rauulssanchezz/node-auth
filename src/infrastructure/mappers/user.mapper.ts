import { CustomError, User } from "../../domain";



export class UserMapper {

    static userEntityFromObject(object: { [key: string]:any}) {

        const { id, _id, name, password, email, roles } = object

        if ( !_id || !id) throw CustomError.badRequest('Missing name')
        if ( !email ) throw CustomError.badRequest('Missing email')
        if ( !name ) throw CustomError.badRequest('Missing name')
        if ( !roles ) throw CustomError.badRequest('Missing roles')
        if ( !password ) throw CustomError.badRequest('Missing password')

        return new User(
            _id || id,
            name,
            email,
            password,
            roles
        )
    }

}