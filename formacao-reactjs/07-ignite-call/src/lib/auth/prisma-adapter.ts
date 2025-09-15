import { Adapter } from 'next-auth/adapters'
import { prisma } from '../prisma'
import { Account } from 'next-auth'
export function PrismaAdapter(): Adapter {
  return {
    // async createUser(user) {
    //   // Create a new user in the database
    //   const newUser = await prisma.user.create({ data: user })
    //   return newUser
    // },
    async getUser(id) {
      // Retrieve a user by their ID
      const user = await prisma.user.findUniqueOrThrow({ where: { id } })
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByEmail(email) {
      // Retrieve a user by their email
      const user = await prisma.user.findUniqueOrThrow({ where: { email } })
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url!,
        emailVerified: null,
      }
    },
    async getUserByAccount({ provider, providerAccountId }) {
      // Retrieve a user by their account details
      const account = await prisma.account.findUniqueOrThrow({
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
        email: account.user.email,
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
        email: updatedUser.email,
        avatar_url: updatedUser.avatar_url!,
        emailVerified: null,
      }
    },
    async linkAccount(account: Account) {
      // Link an account to a user
      await prisma.account.create({
        data: {
          user_id: account.user_id,
          type: account.type,
          provider: account.provider,
          provider_account_id: account.provider_account_id,
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
      const session = await prisma.session.findUniqueOrThrow({
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
          email: user.email,
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
