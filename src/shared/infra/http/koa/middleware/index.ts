import { userRepository } from '@modules/users/repositories'
import { authService } from '@modules/users/services'
import KoaAuthenticationMiddleware from './KoaAuthenticationMiddleware'

export const authMiddleware = new KoaAuthenticationMiddleware(authService, userRepository)
