import faker from 'faker'
import UserEmail, { InvalidEmailError } from './UserEmail'

describe('UserEmail Value Object', () => {
  it('should create a valid value object', () => {
    const address = faker.internet.email().toLowerCase()

    const validUserEmailOrError = UserEmail.create(address)

    expect(validUserEmailOrError.isSuccess()).toBe(true)
    expect(validUserEmailOrError.isFailure()).toBe(false)
    expect(validUserEmailOrError.value?.value).toBe(address)
  })

  it('should not allow to create invalid email address', () => {
    const address = faker.name.findName()

    const validUserEmailOrError = UserEmail.create(address)

    expect(validUserEmailOrError.isSuccess()).toBe(false)
    expect(validUserEmailOrError.isFailure()).toBe(true)
    expect(validUserEmailOrError.value).toBeInstanceOf(InvalidEmailError)
  })

  it('should not allow to create object with empty string', () => {
    const address = ''

    const validUserEmailOrError = UserEmail.create(address)

    expect(validUserEmailOrError.isSuccess()).toBe(false)
    expect(validUserEmailOrError.isFailure()).toBe(true)
    expect(validUserEmailOrError.value).toBeInstanceOf(InvalidEmailError)
  })

  it('should make the valid email address lowercase', () => {
    const address = 'FOO@bar.com'
    const lowerCaseAddress = 'foo@bar.com'

    const validUserEmailOrError = UserEmail.create(address)

    expect(validUserEmailOrError.isSuccess()).toBe(true)
    expect(validUserEmailOrError.isFailure()).toBe(false)
    expect(validUserEmailOrError.value?.value).toBe(lowerCaseAddress)
  })
})
