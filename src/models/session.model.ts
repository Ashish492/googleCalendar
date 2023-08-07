import { DocumentType, Ref, getModelForClass, modelOptions, prop, setGlobalOptions } from '@typegoose/typegoose'
import { User } from '@models/user.model'
import { Schema } from 'mongoose'
setGlobalOptions({
  schemaOptions: {
    validateBeforeSave: true,
  },
})
@modelOptions({ schemaOptions: { timestamps: true, validateBeforeSave: true } })
class Session {
  @prop({ ref: User, required: true })
  user: Ref<User>

  @prop({ default: true, required: true })
  valid: boolean

  @prop({ required: true })
  userAgent: string
}
export const SessionModel = getModelForClass(Session)
export type SessionSchemaType = Schema<typeof Session>
export type SessionType = DocumentType<Session>
