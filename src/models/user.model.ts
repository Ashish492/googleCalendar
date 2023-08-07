import { getModelForClass, modelOptions, pre, prop, queryMethod } from '@typegoose/typegoose'
import { User as IUser } from 'types'
import bcrypt, { genSalt, hash } from 'bcrypt'
import config from 'config'
import { AsQueryMethod, DocumentType, QueryHelperThis } from '@typegoose/typegoose/lib/types'
interface QueryHelpers {
  // use the actual function types dynamically
  hideVersion: AsQueryMethod<typeof hideVersion>
  // the same can be done with other functions (not listed in this example)
  selectPassword: AsQueryMethod<typeof selectPassword>
}
function hideVersion(this: QueryHelperThis<typeof User, QueryHelpers>) {
  return this.select('-__v')
}
function selectPassword(this: QueryHelperThis<typeof User, QueryHelpers>) {
  return this.select('+password')
}
@queryMethod(hideVersion)
@queryMethod(selectPassword)
@pre<User>('save', async function () {
  if (this.isModified('password')) {
    const salt = await genSalt(config.get<number>('saltWorkFactor'))
    this.password = await hash(this.password, salt)
  }
})
@modelOptions({ schemaOptions: { timestamps: true, collection: 'users' } })
export class User implements IUser {
  @prop({ required: [true, 'email is required'], unique: true })
  email: string

  @prop({ required: [true, 'name is required'] })
  name: string

  @prop({ required: [true, 'password is required'], select: false })
  password: string

  async comparePassword(this: DocumentType<User>, candidatePassword: string) {
    return bcrypt.compare(candidatePassword, this.password)
  }
}
export const UserModel = getModelForClass<typeof User, QueryHelpers>(User)
