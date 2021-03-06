import Joi from 'joi'
import BaseController from '@shared/infra/http/BaseController'
import RegisterControllerDto from './DTOs/RegisterControllerDto'
import RegisterUseCase from './RegisterUseCase'
import UserMapper from '@modules/users/mappers/UserMapper'
import RefreshTokenMapper from '@modules/users/mappers/RefreshTokenMapper'
import KoaContext from '@shared/infra/http/koa/KoaContext'

export default class RegisterController extends BaseController<RegisterControllerDto> {
  constructor(private useCase: RegisterUseCase) {
    super()
  }

  protected validationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    passwordConfirm: Joi.string()
      .equal(Joi.ref('password'))
      .required()
      .label('Password confirmation')
      .options({ messages: { 'any.only': '{{#label}} does not match!' } }),
  })

  async executeImpl(ctx: KoaContext): Promise<void> {
    const result = await this.useCase.execute(ctx.request.body)

    if (!result.isFailure()) {
      const { user, refreshToken, accessToken } = result.value
      const resultDto: RegisterControllerDto = {
        user: UserMapper.toDto(user),
        refreshToken: RefreshTokenMapper.toDto(refreshToken),
        accessToken,
      }

      return this.ok(ctx, resultDto)
    }

    this.fail(ctx, result.error.error)
  }
}
