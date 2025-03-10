


export class RegisterUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create(object: {[key: string]: any}): [string?, RegisterUserDto] {
        
        
        
        return []
    }
}