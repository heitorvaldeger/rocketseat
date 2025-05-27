import { FaArrowUpRightFromSquare, FaUserGroup, FaXTwitter, FaGithub, FaBuilding } from "react-icons/fa6"
import { ProfileContainer, ProfileFooter, ProfileInfo, ProfileContent, ProfileName } from "./styles"
import { Link } from "react-router-dom"
import { useUser } from "../../../../contexts/UserContext"

export const Profile = () => {
  const { user } = useUser()

  return (
    <ProfileContainer>
      <img src={user?.avatar_url} alt="" />

      <ProfileContent>
        <ProfileInfo>
          <header>
            <ProfileName>{user?.name}</ProfileName>
            <Link to={user?.html_url ?? '/'} target="_blank">
              Github
              <FaArrowUpRightFromSquare />
            </Link>
          </header>
          <span>
            {user?.bio}
          </span>
        </ProfileInfo>

        <ProfileFooter>
          <span>
            <FaGithub />
            {user?.login}
          </span>

          {
            user?.company && (
              <span>
                <FaBuilding />
                {user.company}
              </span>
            )
          }

          {
            user?.twitter_username && (
              <span>
                <FaXTwitter />
                {user.twitter_username}
              </span>
            )
          }

          <span>
            <FaUserGroup />
            {user?.followers} seguidores
          </span>
        </ProfileFooter>
      </ProfileContent>
    </ProfileContainer>
  )
}