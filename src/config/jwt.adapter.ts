import jwt from "jsonwebtoken"

export class JwtAdapter {

    static async generateToken( payload: Object, duration: number = 7200 ): Promise<string|null> {

        return new Promise( ( resolve ) => {

            jwt.sign( payload, 'SEED', { expiresIn: duration }, (err, token) => {
                
                if (err) return resolve(null)

                resolve(token!)

            })

        } )

    }

}