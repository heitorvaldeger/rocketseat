import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { Account } from 'next-auth'
import { NextApiRequest, NextApiResponse } from 'next'
import { destroyCookie, parseCookies } from 'nookies'

export function PrismaAdapter(
  req: NextApiRequest,
  res: NextApiResponse
): Adapter {
  return {
    async createUser(user: any) {
      const { '@ignitecall:userId': userIdOnCookies } = parseCookies({ req })

      if (!userIdOnCookies) {
        throw new Error('User ID not found in cookies.')
      }

      const prismaUser = await prisma.user.update({
        where: { id: userIdOnCookies },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, '@ignitecall:userId', {
        path: '/',
      })

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        username: prismaUser.username,
        email: prismaUser.email,
        emailVerified: null,
      }
    },
    async getUser(id) {
      // Retrieve a user by their ID
      const user = await prisma.user.findUnique({ where: { id } })
      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByEmail(email) {
      // Retrieve a user by their email
      const user = await prisma.user.findUnique({ where: { email } })
      if (!user) return null

      return {
        id: user.id,
        name: user.name,
        email: user.email!,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByAccount({ provider, providerAccountId }) {
      // Retrieve a user by their account details
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        include: { user: true },
      })

      if (!account) {
        return null
      }

      return {
        id: account.id,
        name: account.user.name,
        email: account.user.email!,
        avatar_url: account.user.avatar_url!,
        emailVerified: null,
      }
    },
    async updateUser(user) {
      // Update user details in the database
      const updatedUser = await prisma.user.update({
        where: { id: user.id },
        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })
      return {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email!,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      }
    },
    async linkAccount(account: Account) {
      // Link an account to a user
      await prisma.account.create({
        data: {
          user_id: account.userId!,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          refresh_token: account.refresh_token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          token_type: account.token_type,
          scope: account.scope,
          id_token: account.id_token,
          session_state: account.session_state,
        },
      })
    },
    async createSession({ userId, expires, sessionToken }) {
      // Create a new session in the database
      await prisma.session.create({
        data: {
          user_id: userId,
          expires,
          session_token: sessionToken,
        },
      })
      return {
        userId,
        sessionToken,
        expires,
      }
    },
    async getSessionAndUser(sessionToken) {
      // Retrieve a session and its associated user
      const session = await prisma.session.findUnique({
        where: { session_token: sessionToken },
        include: { user: true },
      })

      if (!session) return null

      const { user, ...sessionData } = session
      return {
        session: {
          userId: sessionData.user_id,
          sessionToken: sessionData.session_token,
          expires: sessionData.expires,
        },
        user: {
          id: user.id,
          name: user.name,
          email: user.email!,
          avatar_url: user.avatar_url!,
          emailVerified: null,
        },
      }
    },
    async updateSession(session) {
      // Update session details in the database
      const updatedSession = await prisma.session.update({
        where: { session_token: session.sessionToken },
        data: {
          expires: session.expires,
          user_id: session.userId,
        },
        include: { user: true },
      })

      return {
        sessionToken: updatedSession.session_token,
        userId: updatedSession.user_id,
        expires: updatedSession.expires,
      }
    },
  }
}
